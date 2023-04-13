import { IsNumber, IsString, ValidateNested } from 'class-validator';

export class Offer1DTO {
  @IsString()
  offer_id: string;

  @IsString()
  offer_name: string;

  @IsString()
  offer_desc: string;

  @IsString()
  call_to_action: string;

  @IsString()
  disclaimer: string;

  @IsString()
  offer_url: string;

  @IsString()
  offer_url_easy: string;

  @IsNumber()
  payout: number;

  @IsString()
  payout_type: string;

  @IsNumber()
  amount: number;

  @IsString()
  image_url: string;

  @IsString()
  image_url_220x124: string;

  @IsString({ each: true })
  countries: string[];

  @IsString()
  platform: string;

  @IsString()
  device: string;

  @ValidateNested({ each: true })
  category: OfferCategoryDTO[];

  @IsNumber()
  last_modified: number;

  @IsString()
  preview_url: string;

  @IsString()
  package_id: string;

  @ValidateNested({ each: true })
  verticals: OfferVerticalDTO[];
}

class OfferCategoryDTO {
  @IsNumber()
  id: number;

  @IsString()
  name: string;
}

class OfferVerticalDTO {
  @IsNumber()
  vertical_id: number;

  @IsString()
  vertical_name: string;
}

class ResponseDTO {
  
  @ValidateNested({ each: true })
  offers: Offer1DTO[];
}

export class Offer1PayloadDTO {

  @ValidateNested()
  response: ResponseDTO;
}
