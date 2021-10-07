import { Controller, Get, Param, NotAcceptableException } from '@nestjs/common';
import { ParseService, ParsePrismaService } from './parse.service';

@Controller('parse')
export class ParseController {
  constructor(
    private readonly parseService: ParseService,
    private readonly parsePrismaService: ParsePrismaService,
  ) {}

  @Get(':url')
  async getUrlInfo(@Param('url') url: string) {
    if (!url) {
      throw new NotAcceptableException('Please enter a valid url.');
    }

    try {
      const foundUrlData = await this.parsePrismaService.getUrlData(url);

      if (foundUrlData) {
        return foundUrlData;
      } else {
        // get url html
        const urlHtml = await this.parseService.fetchUrlHtml(url);

        // get title, favicon and description from url html
        const parsedUrlData = this.parseService.getUrlDataFromHtml(urlHtml);

        // save new url details to cache db
        const savedUrlData = await this.parsePrismaService.addNewUrlData({
          url,
          ...parsedUrlData,
        });

        return savedUrlData;
      }
    } catch (error) {
      throw error;
    }
  }
}
