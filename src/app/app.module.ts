import Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'testing')
          .required(),
        SERVER_PORT: Joi.string().default('3333'),
        DATABASE_URL: Joi.string().required(),
      }),
    }),
    ConfigModule.forFeature(appConfig),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
