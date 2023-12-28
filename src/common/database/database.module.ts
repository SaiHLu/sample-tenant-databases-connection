import { BadRequestException, Module, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantEntity } from 'src/tenant/entities/tenant.entity';
import { TenantModule } from 'src/tenant/tenant.module';
import { TenantService } from 'src/tenant/tenant.service';
import { User } from 'src/users/entities/user.entity';
import { DataSource } from 'typeorm';

export const TENANT_CONNECTION = 'TENANT_CONNECTION';

// In-memory Caching
const dataSources = new Map<number, DataSource>();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5430,
      username: 'postgres',
      password: 'pass123',
      database: 'postgres',
      synchronize: false,
      entities: [TenantEntity],
    }),
    TenantModule,
  ],
  providers: [
    {
      provide: TENANT_CONNECTION,
      useFactory: async (tenantService: TenantService, request: Request) => {
        const tenantId = Number(request.headers['x-tenant']);

        if (dataSources.has(tenantId)) {
          return dataSources.get(tenantId);
        }

        const tenant = await tenantService.findOne(tenantId);

        if (!tenant)
          throw new BadRequestException(
            `No resources found for tenant ${tenantId}`,
          );

        const newDataSource = new DataSource({
          type: 'postgres',
          host: 'localhost',
          port: 5430,
          username: 'postgres',
          password: 'pass123',
          database: tenant.db_name,
          synchronize: false,
          entities: [User],
        });

        dataSources.set(tenantId, newDataSource);
        return newDataSource.initialize();
      },
      durable: true,
      inject: [TenantService, REQUEST],
      scope: Scope.REQUEST,
    },
  ],
  exports: [TENANT_CONNECTION],
})
export class DatabaseModule {}
