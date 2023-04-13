import { Controller, Get, HttpCode, HttpStatus, Post, Body } from '@nestjs/common';
import { OfferService } from './offer.service';
import { Offer1PayloadDTO } from './offer1.payload.dto';
import { Offer2PayloadDto } from './offer2.payload.dto';
import { Offer } from './offer.entity';

@Controller('offers')
export class OfferController {
    constructor(private readonly offerService: OfferService) { }

    @Get('getOffer')
    getHello(): string {
        return this.offerService.getOffer();
    }

    @Post('offer1')
    @HttpCode(HttpStatus.NO_CONTENT)
    async handleOffer1(@Body() offer1PayloadDto: Offer1PayloadDTO): Promise<void> {
        const providerName = 'offer1';
        const offers = await this.offerService.transformAndValidateOffers(offer1PayloadDto.response.offers, providerName);
        console.log(`validated offer are ---- > ${offers.offers.length}`);
        // here now we user this offers object to validate and store into databse (repository)
        //return this.offerService.saveAll(offers)
    }

    @Post('offer2')
    @HttpCode(HttpStatus.NO_CONTENT)
    async handleOffer2(@Body() offer2PayloadDto: Offer2PayloadDto): Promise<void> {
        const providerName = 'offer2';
        const offers = await this.offerService.transformAndValidateOffers(offer2PayloadDto, providerName);
        console.log(`validated offer are ---- > ${offers.offers.length}`);
    }
}
