import { Injectable } from '@nestjs/common';
import { OffersDTO } from './offer.array.dto';
import { GenericOfferDTO } from './offer.dto';
import { plainToClass } from 'class-transformer';
import { Offer1DTO } from './offer1.payload.dto';
import { OfferBoxSizeEnum } from './offer.boxsize.enum';
import { ValidationError, validate } from 'class-validator';
import { DataDTO, Offer2PayloadDto } from './offer2.payload.dto';
import { Offer } from './offer.entity';

@Injectable()
export class OfferService {



  // to get Offer details
  getOffer(): string {
    return 'Here is the offer for you !!';
  }

  // This will Transform the Payload (offer1,offer2) into GenericOfferDTO and also perfoma validation
  /**
   * 
   * @param providerOffers 
   * @param providerName 
   * @returns OffersDTO
   */
  async transformAndValidateOffers(providerOffers: any, providerName: string): Promise<OffersDTO> {
    let offerArrayDto = new OffersDTO();

    switch (providerName) {
      case 'offer1':
        for (const offerPayload of providerOffers) {
          const offer1 = new GenericOfferDTO();
          const offer1PayloadDto = plainToClass(Offer1DTO, offerPayload);
          offer1.name = offer1PayloadDto.offer_name;
          offer1.slug = offer1PayloadDto.offer_id
          offer1.description = offer1PayloadDto.offer_desc
          offer1.requirements = offer1PayloadDto.call_to_action
          offer1.thumbnail = offer1PayloadDto.image_url
          offer1.boxSize = offer1PayloadDto.platform === 'mobile' ? OfferBoxSizeEnum.SMALL : OfferBoxSizeEnum.LARGE
          offer1.isDesktop = (offer1PayloadDto.platform === 'mobile' && offer1PayloadDto.device === 'iphone_ipad') ? 0 : 1;
          offer1.isAndroid = offer1PayloadDto.device === 'iphone_ipad' ? 0 : 1;
          offer1.isIos = offer1PayloadDto.device === 'iphone_ipad' ? 1 : 0;
          offer1.offerUrlTemplate = offer1PayloadDto.offer_url;
          offer1.providerName = providerName;
          offer1.externalOfferId = offer1PayloadDto.offer_id;

          //const isValid = await this.isValidateOffer(offer);
          const errors: ValidationError[] = await validate(offer1, {
            skipMissingProperties: true,
          });
          if (errors.length > 0) {
            console.log(`offer payload from provider ${offer1.providerName}-${offer1.externalOfferId} is rejected`);
          } else {
            offerArrayDto.offers.push(offer1);
          }
        }
        break;
      case 'offer2':
        const offer2 = new GenericOfferDTO();
        const offer2PayloadDto = plainToClass(Offer2PayloadDto, providerOffers);

        const responseDataCollection: DataDTO[] = [];

        // here the asummption is key for Data is dyanamic and not know.
        // So we are finding key and then iterating to get the data from response JSON
        Object.keys(offer2PayloadDto.data).forEach(key => {
          const value = offer2PayloadDto.data[key];
          responseDataCollection.push(value);
        });

        offer2.name = responseDataCollection[0].Offer.name;
        offer2.slug = responseDataCollection[0].Offer.campaign_id?.toString()
        offer2.description = responseDataCollection[0].Offer.description
        offer2.requirements = responseDataCollection[0].Offer.instructions
        offer2.boxSize = responseDataCollection[0].OS.web ? OfferBoxSizeEnum.LARGE : OfferBoxSizeEnum.SMALL
        offer2.isDesktop = responseDataCollection[0].OS.web ? 1 : 0
        offer2.isAndroid = responseDataCollection[0].OS.android ? 1 : 0
        offer2.isIos = responseDataCollection[0].OS.ios ? 1 : 0
        offer2.offerUrlTemplate = responseDataCollection[0].Offer.tracking_url;
        offer2.providerName = providerName;
        offer2.icon = responseDataCollection[0].Offer.icon;
        offer2.externalOfferId = responseDataCollection[0].Offer.campaign_id?.toString();

        // validation started : if validation failed we only printing into console and 
        // if passed then adding it collection to send back to the controller.
        const errors: ValidationError[] = await validate(offer2, {
          skipMissingProperties: true,
        });
        if (errors.length > 0) {
          console.log(`offer payload from provider ${offer2.providerName}-${offer2.externalOfferId} is rejected`);
        } else {
          offerArrayDto.offers.push(offer2);
        }
        break;
      default:
        console.log('Unknown provider name')
    }
    return offerArrayDto;
  }

  /**
   * 
   * @param createProductDto 
   * @returns 
   */
  async save(genericOfferDTO: GenericOfferDTO): Promise<Offer> {
    const offer = new Offer();
    // we can use this function to tranform value from DTO to class 
    //const offer = plainToClass(Offer, genericOfferDTO);

    // to have more controlled validation (if needed)
    offer.name = genericOfferDTO.name;
    offer.slug = genericOfferDTO.slug
    offer.description = genericOfferDTO.description;
    offer.requirements = genericOfferDTO.requirements;
    offer.thumbnail = genericOfferDTO.thumbnail;
    offer.boxSize = genericOfferDTO.boxSize;
    offer.isDesktop = genericOfferDTO.isDesktop;
    offer.isAndroid = genericOfferDTO.isAndroid;
    offer.isIos = genericOfferDTO.isIos;
    offer.offerUrlTemplate = genericOfferDTO.offerUrlTemplate;
    offer.providerName = genericOfferDTO.providerName;
    offer.externalOfferId = genericOfferDTO.externalOfferId;
    offer.icon = genericOfferDTO.icon;

    //return await this.offerRepository.save(offer);
    return offer;
  }

  async saveAll(offersDto: OffersDTO): Promise<Offer[]> {
    const batchSize = 100; // Set batch size
    const savedOffers: Offer[] = [];
    const genericOfferDTO = offersDto?.offers;

    for (let i = 0; i < genericOfferDTO.length; i += batchSize) {
      const batch = genericOfferDTO.slice(i, i + batchSize);
      //const savedBatch = await this.offerRepository.save(batch.map((genericOffer) => plainToClass(Offer, genericOffer)));
      savedOffers.push(...batch.map((genericOffer) => plainToClass(Offer, genericOffer)));
    }

    return savedOffers;
  }

}


