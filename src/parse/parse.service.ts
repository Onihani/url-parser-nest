import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  RequestTimeoutException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import cheerio from 'cheerio';

import { fetchWithTimeout } from '../../helpers';

interface newUrlData {
  url: string;
  description: string;
  favicon: string;
  title: string;
}

@Injectable()
export class ParseService {
  async fetchUrlHtml(url: string) {
    try {
      const response = await fetchWithTimeout(`https://${url}`);
      const responseText: string = await response.data;

      return responseText;
    } catch (error) {
      throw new RequestTimeoutException('Request took too long to response');
    }
  }

  getUrlDataFromHtml(htmlString: string) {
    // response to be returned to user with default values || placeholder response
    const result = {
      title: 'no title',
      favicon: 'no favicon',
      description: 'no description',
    };

    // create an html document from respone text
    const $ = cheerio.load(htmlString);

    // retriving favicon from response text
    const favicon = $("link[rel*='icon']").attr('href');
    result.favicon = favicon || result.favicon;

    // retriving title response text
    result.title = $('title').text() || result.title;

    // retriving title response text
    result.description =
      $("meta[name*='description']").attr('content') || result.description;

    return result;
  }
}

@Injectable()
export class ParsePrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }

  async getUrlData(url: string) {
    const foundUrl = await this.url.findFirst({
      where: { url },
      select: {
        title: true,
        favicon: true,
        description: true,
      },
    });

    return foundUrl;
  }

  async addNewUrlData(data: newUrlData) {
    const addedUrl = await this.url.create({
      data,
      select: {
        title: true,
        favicon: true,
        description: true,
      },
    });

    return addedUrl;
  }
}
