import { Bench } from './bench'; // Adjust the import paths as necessary
import { Location } from './location'; // Adjust the import paths as necessary
import { Status } from './status'; // Adjust the import paths as necessary

export interface History {
    id: number;
    benchId: number;
    locationId: number;
    statusId: number;
    bench?: Bench; // Add this line
    location?: Location; // Add this line
    status?: Status; // Add this line
}