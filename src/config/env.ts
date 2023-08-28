import { bool, cleanEnv, str } from 'envalid';

const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['local', 'dev', 'test', 'prod'] }),
  HEADLESS: bool({ default: true }),
  USE_PROXY: bool({ default: false }),
  PROXY_USERNAME: str(),
  PROXY_PASSWORD: str(),
  PROXY_SERVER: str()
});

export type Env = typeof env;

export default env;
