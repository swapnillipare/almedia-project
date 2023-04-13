import { OfferBoxSizeEnum } from "./offer.boxsize.enum";

export interface IOffer{
    id: number;
    name: string;
    slug: string;
    description: string;
    requirements: string;
    boxSize: OfferBoxSizeEnum;
    isDesktop: number;
    isAndroid: number;
    isIos: number;
    offerUrlTemplate: string;
    providerName: string;
    externalOfferId: string;
    icon:string;
}