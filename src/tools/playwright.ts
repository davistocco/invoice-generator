import playwrightCore, { Browser, Page } from 'playwright-core';
import playwright from 'playwright';
import chromium from '@sparticuz/chromium-min';
import { anonymizeProxy } from 'proxy-chain';
import env from '../config/env';
import UserAgent from 'user-agents';

// #region Browser
export const initBrowser = async () => {
  const browser = await playwrightCore.chromium.launch({
    args: await getPlaywrightArgs(),
    executablePath: await getBrowserPath(),
    headless: env.HEADLESS,
    timeout: 600 * 1000
  });
  console.log('Browser initialized');
  return browser;
};

export const closeBrowser = async (browser: Browser) => {
  await browser.close();
  console.log('Browser closed');
};

const getPlaywrightArgs = async () => {
  const args = [
    ...chromium.args,
    '--no-sandbox',
    '--single-process',
    '--disable-gpu',
    '--disable-dev-shm-usage',
    '--no-sandbox'
  ];
  if (env.USE_PROXY) {
    console.log('Using proxy');
    const proxy = await getProxy();
    args.push(`--proxy-server=${proxy}`);
  }
  return args;
};

const getBrowserPath = async () => {
  if (env.NODE_ENV === 'local') {
    return playwright.chromium.executablePath();
  }
  return await chromium.executablePath(
    // TODO: put this file in a github release or s3 bucket
    'https://github.com/Sparticuz/chromium/releases/download/v110.0.1/chromium-v110.0.1-pack.tar'
  );
};

const getProxy = async (): Promise<string> => {
  const server = env.PROXY_SERVER;
  const username = env.PROXY_USERNAME;
  const password = env.PROXY_PASSWORD;
  const proxy = `http://${username}:${password}@${server}`;
  return await anonymizeProxy(proxy);
};
// #endregion Browser

// #region Page
export const initPage = async (browser: Browser) => {
  const page = await browser.newPage({
    userAgent: new UserAgent().toString()
  });
  return page;
};

export const closePage = async (page: Page) => {
  await page.close();
  console.log('Page closed');
};
// #endregion Page
