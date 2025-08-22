import { ConfigType, registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  NODE_ENV: process.env.NODE_ENV as string,
  SERVER_PORT: process.env.SERVER_PORT as string,
  DATABASE_URL: process.env.DATABASE_URL as string,
}));

export type AppConfig = ConfigType<typeof appConfig>;
