import 'dotenv/config';
import { Browser, Page } from 'playwright-core';
import { closeBrowser, closePage, initBrowser, initPage } from './tools/playwright';
import { InvoiceEmitter } from './usecases/invoice-emitter';
import { InvoiceEmitterOptionsRepository } from './repositories/invoice-emitter-options.repository';

let browser: Browser;
let page: Page;

/**
 * TODO: create a factory for this handler.
 * TODO: decouple InvoiceEmitter and InvoiceEmitterOptionsRepository from this handler.
 */
export const handler = async () => {
  try {
    console.info('Handler started');
    browser = await initBrowser();
    page = await initPage(browser);
    const repository = new InvoiceEmitterOptionsRepository();
    const options = await repository.getLastOptionsConfig();
    const invoiceEmitter = new InvoiceEmitter(options);
    await invoiceEmitter.handle(page);
    await closePage(page);
    await closeBrowser(browser);
    console.info('Handler finished successfully');
  } catch (e) {
    await closePage(page);
    await closeBrowser(browser);
    throw e;
  }
};
