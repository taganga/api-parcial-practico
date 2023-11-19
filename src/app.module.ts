import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClubModule } from './club/club.module';
import { SocioModule } from './socio/socio.module';

@Module({
  imports: [ClubModule, SocioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
