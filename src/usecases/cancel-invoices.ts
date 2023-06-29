import { PlaywrightCrawlingContext } from "crawlee";

const cancelInvoices = async ({ page }: PlaywrightCrawlingContext) => {
    await page.locator('#Menu1_MenuPrincipal > ul > li:nth-child(2) > div > a').click();
    const frame = page.frameLocator('#iframe');
    await frame.locator('#txtNumIni').fill('');
    await frame.locator('#txtNumFinal').fill('');
    await frame.locator('#imbArrow').click();
    await frame.locator('#ddlStatusNfse').selectOption('Normal');
    await frame.locator('#btnLocalizar2').click();
    await page.waitForTimeout(5000);
    const elements = await frame.locator('a[data-original-title="Solicitar Cancelamento"]').all();
    for (const i in elements) {
        await elements[i].dispatchEvent('click');
        console.log(i, '- (Click) Cancelar');
        const modal = frame.frameLocator('#iframeModal');
        await modal.locator('#txtJustificativa').fill('');
        await modal.locator('#btnOK').dispatchEvent('click');
        await modal.locator('#btnAssinaSenha').click();
        await modal.locator('#txtSenhaAssinatura').fill('');
        await modal.locator('#btnOkAssinaSenha').click();
        await page.waitForTimeout(3000);
    }
}

export default cancelInvoices;