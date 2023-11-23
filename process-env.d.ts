declare namespace NodeJS {
  export type ProcessEnv = {
    PORT: number;
    DATABASE_URL_LOCAL: string;
    DATABASE_URL: string;
    BCRYPT_SALT_ROUNDS: number;
  };
}
