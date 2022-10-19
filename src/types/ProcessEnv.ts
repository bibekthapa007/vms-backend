declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    NODE_ENV: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    JWT_SECRET_KEY: string;
    JWT_EXPIRATION: string;
    SERVER_URL: string;
    CLIENT_URL: string;
  }
}
