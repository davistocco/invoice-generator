import 'dotenv/config';
import env from './config/env';
import { Browser, Page } from 'playwright-core';
import { closeBrowser, closePage, initBrowser, initPage } from './tools/playwright';
import { InvoiceEmitter } from './usecases/invoice-emitter';
import { InvoiceEmitterOptionsRepository } from './repositories/invoice-options.repository';
import { Client } from '@notionhq/client';

let browser: Browser;
let page: Page;

/**
 * TODO: create a factory for this handler.
 */
export const handler = async () => {
  try {
    browser = await initBrowser();
    page = await initPage(browser);
    const options = await getOptions();
    const invoiceEmitter = new InvoiceEmitter(options);
    await invoiceEmitter.handle(page);
  } catch (err) {
    await closePage(page);
    await closeBrowser(browser);
    console.error(err);
    throw err;
  }
};

const getOptions = async () => {
  const client = new Client({ auth: env.NOTION_TOKEN });
  const repository = new InvoiceEmitterOptionsRepository(client);
  return await repository.getLastOptionsConfig();
};
