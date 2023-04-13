import { IsNotEmpty, IsOptional } from 'class-validator';
import { OfferBoxSizeEnum } from './offer.boxsize.enum';

export class GenericOfferDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  slug: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  requirements: string;

  @IsOptional()
  thumbnail: string;

  @IsOptional()
  icon: string;

  @IsNotEmpty()
  boxSize: OfferBoxSizeEnum;

  @IsNotEmpty()
  isDesktop: number;

  @IsNotEmpty()
  isAndroid: number;

  @IsNotEmpty()
  isIos: number;

  @IsNotEmpty()
  offerUrlTemplate: string;

  @IsNotEmpty()
  providerName: string;

  @IsNotEmpty()
  externalOfferId: string;
}