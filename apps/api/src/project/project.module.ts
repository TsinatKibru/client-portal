import { Module, forwardRef } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { UploadModule } from '../upload/upload.module';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';

@Module({
  imports: [UploadModule],
  controllers: [ProjectController, ActivityController],
  providers: [ProjectService, ActivityService],
  exports: [ProjectService, ActivityService]
})
export class ProjectModule { }
