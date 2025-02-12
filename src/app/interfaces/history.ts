import { Bench } from './bench';
import { Location } from './location';
import { Status } from './status';

export interface History {
    id: number;
    benchId: number;
    locationId: number;
    statusId: number;
    bench?: Bench;
    location?: Location;
    status?: Status;
}