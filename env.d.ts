declare namespace NodeJS {
  interface ProcessEnv {
    MONGODB_URI: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    // NODE_ENV: "development" | "production" | "test";
    // Add other environment variables here:
    // NEXT_PUBLIC_API_URL?: string;
  }
}
