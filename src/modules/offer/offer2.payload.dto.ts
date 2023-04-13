import { IsNotEmpty, IsNumber, IsPositive, IsString, ValidateNested } from 'class-validator';

export class Offer2DTO {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  campaign_id: number;

  store_id: null;

  @IsNotEmpty()
  @IsString()
  tracking_type: string;

  @IsNotEmpty()
  @IsString()
  campaign_vertical: string;

  @IsNotEmpty()
  @IsString()
  currency_name_singular: string;

  @IsNotEmpty()
  @IsString()
  currency_name_plural: string;

  @IsNotEmpty()
  @IsString()
  network_epc: string;

  @IsNotEmpty()
  @IsString()
  icon: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  tracking_url: string;

  @IsNotEmpty()
  @IsString()
  instructions: string;

  disclaimer: null;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  short_description: string;

  @IsNotEmpty()
  @IsString()
  offer_sticker_text_1: string;

  offer_sticker_text_2: null;

  offer_sticker_text_3: null;

  @IsNotEmpty()
  @IsString()
  offer_sticker_color_1: string;

  @IsNotEmpty()
  @IsString()
  offer_sticker_color_2: string;

  @IsNotEmpty()
  @IsString()
  offer_sticker_color_3: string;

  sort_order_setting: null;

  @IsNotEmpty()
  @IsString()
  category_1: string;

  category_2: null;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  payout_usd: number;

  @IsNotEmpty()
  @IsString()
  start_datetime: string;

  @IsNotEmpty()
  @IsString()
  end_datetime: string;

  @IsNotEmpty()
  is_multi_reward: boolean;
}

class CountryDTO {
  include: {
    [key: string]: {
      id: number;
      code: string;
      name: string;
    };
  };

  exclude: [];
}

class StateDTO {
  include: [];

  exclude: [];
}

class CityDTO {
  include: [];

  exclude: [];
}

class ConnectionTypeDto {
  cellular: boolean;

  wifi: boolean;
}

class DeviceDTO {
  include: [];

  exclude: [];
}

class OsDTO {
  @IsNotEmpty()
  android: boolean;

  @IsNotEmpty()
  ios: boolean;

  @IsNotEmpty()
  web: boolean;

  min_ios: null;

  max_ios: null;

  min_android: null;

  max_android: null;
}

export class DataDTO {
  @ValidateNested()
  Offer: Offer2DTO;

  @ValidateNested()
  Country: CountryDTO;

  @ValidateNested()
  State: StateDTO;

  @ValidateNested()
  City: CityDTO;

  @ValidateNested()
  Connection_Type: ConnectionTypeDto;

  @ValidateNested()
  Device: DeviceDTO;

  @ValidateNested()
  OS: OsDTO;
}

export class Offer2PayloadDto {
  @IsNotEmpty()
  @IsString()
  status: string;

  @ValidateNested()
  data: {
    [key: string]: DataDTO;
  };
}
