import { PlaywrightCrawlingContext } from "crawlee";
import { FrameLocator, Page } from "playwright";
import { TAX_RATE_CITY, TAX_RATE_FEDERAL } from "../constants/tax-rates.constants.js";
import { InvoiceEmitterOptions } from "../types/invoice-emitter-options.type.js";
import { Month } from "../enums/month.enum.js";

export class InvoiceEmitter {
    private page!: Page;
    private emitterFrame!: FrameLocator;
    private readonly login: string;
    private readonly password: string;
    private readonly invoiceValue: number;
    private readonly invoiceMonth: Month;
    private readonly invoiceYear: number;
    private readonly emailRecipients: string[];
    private readonly baseInvoiceCode: string;

    constructor(options: InvoiceEmitterOptions) {
        this.login = options.login;
        this.password = options.password;
        this.invoiceValue = options.invoiceValue;
        this.invoiceMonth = options.invoiceMonth;
        this.invoiceYear = options.invoiceYear;
        this.emailRecipients = options.emailRecipients;
        this.baseInvoiceCode = options.baseInvoiceCode;
    }

    public async handle({ page }: PlaywrightCrawlingContext) {
        try {
            this.page = page;
            await this.emitInvoice();
        } catch (e) {
            console.error('Erro ao emitir nota fiscal');
            throw e;
        }
    }

    private async emitInvoice() {
        await this.makeLogin();
        await this.dismissHomeModal();
        await this.generateInvoice();
        await this.sendEmailWithInvoice();
        console.info('Nota fiscal emitida com sucesso');
    }

    //#region Login Process
    private async makeLogin() {
        await this.page.locator('#txtLogin').fill(this.login);
        await this.setPassword();
        await this.page.locator('#btnAcessar').click();
        await this.page.waitForURL('https://www.notaeletronica.com.br/ribeiraopreto/Default/Master2.aspx');
        console.info('Login realizado');
    }

    private async setPassword() {
        const loginButtonsWrapper = this.page.locator('#page-content-wrapper > div > div > div > div.row > div.col-md-6 > div > div > div > div > div > div:nth-child(5) > div');
        for (const char of this.password.split('')) {
            await loginButtonsWrapper.getByText(char).click();
        }
    }

    private async dismissHomeModal() {
        try {
            await this.page.locator('#btnOkMsg').click({ timeout: 3000 });
        } catch (err) {
            //
        }
    }
    //#endregion

    //#region Invoice Generation 
    private async generateInvoice() {
        await this.page.locator('#Menu1_MenuPrincipal > ul > li:nth-child(1) > div > a').click();
        this.emitterFrame = this.page.frameLocator('#iframe');
        await this.emitterFrame.locator('#txtNumCarregaNf').fill(this.baseInvoiceCode);
        await this.emitterFrame.locator('#btnCarregaNf').click();
        await this.page.waitForResponse('https://www.notaeletronica.com.br/ribeiraopreto/NotaDigital/NovaNotaDigitalAbrasf.aspx');
        await this.emitterFrame.locator('#txtDescServicos').clear();
        await this.emitterFrame.locator('#txtDescServicos').fill(this.prepareInvoiceDescription());
        await this.emitterFrame.locator('#txtTotal').fill(this.invoiceValue.toString());
        await this.emitterFrame.locator('#txtTotal2').click();
        await this.emitterFrame.locator('#btnAssinar').click();
        await this.emitterFrame.locator('#btnAssinaSenha').click();
        await this.emitterFrame.locator('#txtSenhaAssinatura').fill(this.password);
        await this.emitterFrame.locator('#btnOkAssinaSenha').click();
        console.info('Nota gerada');
    }

    private prepareInvoiceDescription(): string {
        return `Prestação de serviços referentes ao mês de ${this.invoiceMonth} de ${this.invoiceYear}
        
    Valor aproximado dos tributos: 
    Federal (${this.formatPercentage(TAX_RATE_FEDERAL)}): ${this.calculateFederalTax()}
    Municipal (${this.formatPercentage(TAX_RATE_CITY)}): ${this.calculateCityTax()}
    Fonte IBPT`.trim();
    }

    /**
     * Formats a value between 0 and 1 as a percentage.
     */
    private formatPercentage(value: number): string {
        return (value * 100).toFixed(2).replace('.', ',') + '%';
    }

    private calculateFederalTax(): string {
        return this.formatCurrency(this.invoiceValue * TAX_RATE_FEDERAL);
    }

    private calculateCityTax(): string {
        return this.formatCurrency(this.invoiceValue * TAX_RATE_CITY);
    }

    private formatCurrency(value: number): string {
        return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
    //#endregion

    //#region Invoice Emailing
    private async sendEmailWithInvoice() {
        const generatedInvoiceFrame = this.emitterFrame.frameLocator('#iframeModal');
        await generatedInvoiceFrame.getByText('Enviar por Email').dispatchEvent('click');
        await generatedInvoiceFrame.locator('#btnOutroDestinatario').click();
        await generatedInvoiceFrame.locator('#txtMailEnvio').fill(this.emailRecipients.join(';'));
        await generatedInvoiceFrame.locator('#btnEnviarNovoEmail').click();
        console.info('Email enviado');
    }
    //#endregion
}