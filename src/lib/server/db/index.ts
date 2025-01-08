import { type Database } from './types';
import pg from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import { env } from '$env/dynamic/private';

export const pool = new pg.Pool({ connectionString: env.DATABASE_URL });
export const dialect = new PostgresDialect({ pool });
export const db = new Kysely<Database>({ dialect });
