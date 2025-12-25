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
        type: string;
        description: string;
        createdAt: Date;
        userId: string;
        projectId: string;
        businessId: string;
    })[]>;
    findAll(projectId: string): Promise<({
        user: {
            id: string;
            email: string;
        };
    } & {
        id: string;
        type: string;
        description: string;
        createdAt: Date;
        userId: string;
        projectId: string;
        businessId: string;
    })[]>;
}
