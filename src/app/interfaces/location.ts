export interface Location {
    id: number;
    longitude: number;
    latitude: number;
    address?: string;
}

export interface LocationDto {
    id?: number,
    longitude: string,
    latitude: string;
}