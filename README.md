# Invoice Generator
This repository contains an open-source project that implements an automated invoice generator for the Nota Control system. The program performs login, generates invoices based on specific parameters, and sends them via email. It is a simple and efficient solution to automate the invoice generation process in Nota Control. Visit their website at: [Nota Control](https://www.notacontrol.com.br/home/)<br>

Reach me on LinkedIn: [Davi Santoro Stocco](https://linkedin.com/in/davistocco)

### How to generate

1. Fill in the `.env.local` file at the root of the project. Format:

```env
NOTA_CONTROL_CITY=ribeiraopreto
LOGIN=99999999999
PASSWORD=999999
BASE_INVOICE_CODE=99
INVOICE_VALUE=2000
EMAIL_RECIPIENTS=financial@company.com,whatever@youwant.com
```
- "NOTA_CONTROL_CITY": The city where your access is registered (e.g., ribeiraopreto). This will be concatenated in the notaeletronica URL.
- "LOGIN": Your nota control login (CPF).
- "PASSWORD": The password associated with the account to log in.
- "BASE_INVOICE_CODE": The base code for generating invoices (it is an existing note). It serves as a template for each generated invoice, allowing consistent formatting and structure across all invoices. Contains payer information and other relevant details.
- "INVOICE_VALUE": The value of the invoice to be generated.
- "EMAIL_RECIPIENTS": A list of email addresses to which the invoices will be sent.

To execute the program, follow these steps:

1. Run `npm install`.
2. Run `npm run dev`.

These are the required steps to execute the program. Ensure that you fill in the information correctly in the env file before running the project.
