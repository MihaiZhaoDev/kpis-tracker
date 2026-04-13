import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(8),
  JWT_EXPIRES_IN: z.string().default('7d'),
});

export type EnvConfig = z.infer<typeof envSchema>;

export function validateEnv() {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error('\n❌ Environment validation failed:\n');
    for (const issue of parsed.error.issues) {
      const field = issue.path.join('.');
      console.error(`  ${field}: ${issue.message}`);
    }
    console.error(
      '\n💡 Check your .env file or environment variables. See .env.example for reference.\n',
    );
    process.exit(1);
  }
  return parsed.data;
}
