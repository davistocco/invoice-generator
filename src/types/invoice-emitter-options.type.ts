import { Month } from '../enums/month.enum';

export type InvoiceEmitterOptions = {
    notaControlCity: string
    login: string
    password: string
    baseInvoiceCode: string
    invoiceValue: number
    invoiceMonth: Month
    invoiceYear: number
    emailRecipients: string[]
};
