import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { GenericOfferDTO } from "./offer.dto";

export class OffersDTO {

    @ValidateNested({ each: true })
    @Type(() => GenericOfferDTO)
    offers: GenericOfferDTO[] = [];
  }
  