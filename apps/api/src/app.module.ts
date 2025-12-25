import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { BusinessModule } from './business/business.module';
import { ClientModule } from './client/client.module';
import { ProjectModule } from './project/project.module';
import { InvoiceModule } from './invoice/invoice.module';
import { UploadModule } from './upload/upload.module';
import { PortalModule } from './portal/portal.module';
import { RealtimeModule } from './realtime/realtime.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    BusinessModule,
    ClientModule,
    ProjectModule,
    InvoiceModule,
    UploadModule,
    PortalModule,
    RealtimeModule,
    CommentModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
