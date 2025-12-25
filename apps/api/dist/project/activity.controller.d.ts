import { ActivityService } from './activity.service';
export declare class ActivityController {
    private activityService;
    constructor(activityService: ActivityService);
    findAllByBusiness(req: any): Promise<({
        user: {
            id: string;
            email: string;
        };
        project: {
            title: string;
        };
    } & {
        id: string;
        businessId: string;
        createdAt: Date;
        type: string;
        projectId: string;
        description: string;
        userId: string;
    })[]>;
    findAll(projectId: string): Promise<({
        user: {
            id: string;
            email: string;
        };
    } & {
        id: string;
        businessId: string;
        createdAt: Date;
        type: string;
        projectId: string;
        description: string;
        userId: string;
    })[]>;
}
