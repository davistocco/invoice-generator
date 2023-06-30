import 'dotenv/config';
import options from '../options.json' assert { type: 'json' };
import { PlaywrightCrawler, PlaywrightCrawlingContext } from 'crawlee';
import { InvoiceEmitter } from './usecases/invoice-emitter.ts';
import { InvoiceEmitterOptions } from './types/invoice-emitter-options.type.ts';

console.time();
const invoiceEmitter = new InvoiceEmitter(options as InvoiceEmitterOptions);
const crawler = new PlaywrightCrawler({
    headless: process.env.HEADLESS !== 'false',
    requestHandlerTimeoutSecs: 180,
    requestHandler: async (context: PlaywrightCrawlingContext) => {
        await invoiceEmitter.handle(context);
    },
});
const loginUrl = `https://www.notaeletronica.com.br/${options.notaControlCity}/Login/Login_NFE.aspx`;
await crawler.run([loginUrl]);
console.timeEnd();
