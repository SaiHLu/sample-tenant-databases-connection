import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantEntity } from './entities/tenant.entity';
import { TenantController } from './tenant.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TenantEntity])],
  controllers: [TenantController],
  providers: [TenantService],
  exports: [TenantService],
})
export class TenantModule {}
