import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantEntity } from './entities/tenant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TenantEntity])],
  providers: [TenantService],
  exports: [TenantService],
})
export class TenantModule {}
