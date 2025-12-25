import { ActivityService } from './activity.service';
export declare class ActivityController {
    private activityService;
    constructor(activityService: ActivityService);
    findAll(projectId: string): Promise<({
        user: {
            id: string;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        type: string;
        projectId: string;
        description: string;
        userId: string;
    })[]>;
}
