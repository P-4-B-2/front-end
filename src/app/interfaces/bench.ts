import { Location } from './location';
import { Status } from './status';

export interface Bench {
    id: number,
    name: string,
    currentLocation?: Location | null | undefined,
    pastLocations: (Location | undefined)[]
}