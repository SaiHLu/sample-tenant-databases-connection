import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TenantEntity } from './entities/tenant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(TenantEntity)
    private readonly tenantRepository: Repository<TenantEntity>,
  ) {
    console.log('hola');
  }

  async findOne(tenantId: number) {
    return this.tenantRepository.findOne({ where: { id: tenantId } });
  }

  async findAll() {
    return this.tenantRepository.find();
  }
}
