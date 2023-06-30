# Invoice Generator
This repository contains an open-source project that implements an automated invoice generator for the Nota Control system. The program performs login, generates invoices based on specific parameters, and sends them via email. It is a simple and efficient solution to automate the invoice generation process in Nota Control. Visit their website at: [Nota Control](https://www.notacontrol.com.br/home/)<br>

Reach me on LinkedIn: [Davi Santoro Stocco](https://linkedin.com/in/davistocco)

### How to generate

1. Fill in the `invoice-emitter-options.json` file at the root of the project. Format:

```json
{
    "login": "",
    "password": "",
    "baseInvoiceCode": "",
    "invoiceValue": 0,
    "invoiceMonth": "",
    "invoiceYear": 2023,
    "emailRecipients": []
}
```
- "login": Your nota control login (CPF).
- "password": The password associated with the account to log in.
- "baseInvoiceCode": The base code for generating invoices (it is an existing note). It serves as a template for each generated invoice, allowing consistent formatting and structure across all invoices. Contains payer information and other relevant details.
- "invoiceValue": The value of the invoice to be generated.
- "invoiceMonth": The month of the invoice to be generated. Please fill in the month using the full name of the month in PT (e.g., Janeiro, Fevereiro, Março, etc.)
- "invoiceYear": The year of the invoice to be generated (e.g., 2023)
- "emailRecipients": A list of email addresses to which the invoices will be sent.

To execute the program, follow these steps:

1. Run `npm install`.
2. Run `npm run start`.

These are the required steps to execute the program. Ensure that you fill in the information correctly in the `invoice-emitter-options.json` file before running the project.
