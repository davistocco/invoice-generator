import { Client } from '@notionhq/client';
import { InvoiceEmitterOptions } from '../types/invoice-emitter-options.type';

/**
 * Notion implementation of the InvoiceOptionsRepository.
 * TODO: make this a implementation of the not yet created InvoiceOptionsRepository interface.
 */
export class InvoiceEmitterOptionsRepository {
  constructor(
        private readonly client: Client
  ) { }

  public async getLastOptionsConfig(): Promise<InvoiceEmitterOptions> {
    throw new Error('Not implemented');
  }
}
