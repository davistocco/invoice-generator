import { InvoiceEmitterOptions } from '../types/invoice-emitter-options.type';
import { currentMonthStringBR, currentYear } from '../utils/date.utils';

/**
 * TODO: make this a implementation of the not yet created InvoiceOptionsRepository interface.
 * TODO: create a real repository for this, by now it's just a mock.
 */
export class InvoiceEmitterOptionsRepository {
  public async getLastOptionsConfig(): Promise<InvoiceEmitterOptions> {
    return {
      notaControlCity: process.env.NOTA_CONTROL_CITY as string,
      login: process.env.LOGIN as string,
      password: process.env.PASSWORD as string,
      baseInvoiceCode: process.env.BASE_INVOICE_CODE as string,
      invoiceValue: Number(process.env.INVOICE_VALUE),
      invoiceMonth: currentMonthStringBR(),
      invoiceYear: currentYear(),
      emailRecipients: process.env.EMAIL_RECIPIENTS?.split(',') as string[]
    };
  }
}
