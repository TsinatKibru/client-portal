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
        createdAt: Date;
        userId: string;
        projectId: string;
        businessId: string;
        description: string;
        type: string;
    })[]>;
    findAll(projectId: string): Promise<({
        user: {
            id: string;
            email: string;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        projectId: string;
        businessId: string;
        description: string;
        type: string;
    })[]>;
}
