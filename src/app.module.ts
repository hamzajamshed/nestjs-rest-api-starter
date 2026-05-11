import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { User } from './users/entities/user.entity';
import { Post } from './posts/entities/post.entity';

@Module({
  imports: [
    // Config — loads .env globally
    ConfigModule.forRoot({ isGlobal: true }),

    // TypeORM — Use SQLite in dev, MySQL in production
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        const nodeEnv = config.get('NODE_ENV', 'development');
        const isProd = nodeEnv === 'production';

        // Production: MySQL
        if (isProd) {
          return {
            type: 'mysql',
            host: config.get('DB_HOST', 'localhost'),
            port: config.get<number>('DB_PORT', 3306),
            username: config.get('DB_USERNAME', 'root'),
            password: config.get('DB_PASSWORD', ''),
            database: config.get('DB_NAME', 'nestjs_starter'),
            entities: [User, Post],
            synchronize: false,
            logging: false,
          };
        }

        // Development: SQLite (no external db needed)
        return {
          type: 'better-sqlite3',
          database: 'nestjs_dev.db',
          entities: [User, Post],
          synchronize: true, // auto-sync in dev
          logging: nodeEnv === 'development',
        };
      },
      inject: [ConfigService],
    }),

    AuthModule,
    UsersModule,
    PostsModule,
  ],
})
export class AppModule {}
