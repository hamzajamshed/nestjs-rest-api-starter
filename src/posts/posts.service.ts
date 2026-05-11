import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { User, UserRole } from '../users/entities/user.entity';
import { CreatePostDto, UpdatePostDto, PostQueryDto } from './dto/post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepo: Repository<Post>,
  ) {}

  async create(dto: CreatePostDto, author: User): Promise<Post> {
    const post = this.postsRepo.create({ ...dto, authorId: author.id });
    return this.postsRepo.save(post);
  }

  async findAll(query: PostQueryDto) {
    const { status, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const qb = this.postsRepo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .orderBy('post.createdAt', 'DESC')
      .skip(skip)
      .take(limit);

    if (status) qb.andWhere('post.status = :status', { status });

    const [data, total] = await qb.getManyAndCount();

    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.postsRepo.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!post) throw new NotFoundException(`Post #${id} not found`);
    return post;
  }

  async update(id: string, dto: UpdatePostDto, user: User): Promise<Post> {
    const post = await this.findOne(id);
    this.assertOwnerOrAdmin(post, user);
    Object.assign(post, dto);
    return this.postsRepo.save(post);
  }

  async remove(id: string, user: User): Promise<{ message: string }> {
    const post = await this.findOne(id);
    this.assertOwnerOrAdmin(post, user);
    await this.postsRepo.remove(post);
    return { message: `Post #${id} deleted successfully` };
  }

  async findByAuthor(authorId: string) {
    return this.postsRepo.find({
      where: { authorId },
      order: { createdAt: 'DESC' },
    });
  }

  private assertOwnerOrAdmin(post: Post, user: User) {
    if (post.authorId !== user.id && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('You do not have permission to modify this post');
    }
  }
}
