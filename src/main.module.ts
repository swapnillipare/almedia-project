import { Module } from '@nestjs/common';
import { AppModule } from './modules/app/app.module';
import { OfferModule } from './modules/offer/offer.module';

@Module({
  imports: [AppModule,OfferModule],
  controllers: [],
  providers: [],
})
export class MainModule {}
