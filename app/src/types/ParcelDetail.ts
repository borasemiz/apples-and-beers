export interface ParcelDetail {
  parcel_id: string;
  parcel_name: string;
  parcel_owner: string;
  parcel_area: number;
  parcel_area_unit: string;
  parcel_location: {
    type: 'Feature';
    properties: Record<string, unknown>;
    geometry: {
      coordinates: [number, number];
      type: 'Point';
    };
  };
  parcel_geometry: {
    type: 'Feature';
    properties: Record<string, unknown>;
    geometry: {
      coordinates: Array<[number, number]>;
      type: 'Polygon';
    };
  };
  parcel_daily_data: Array<{
    Date: string;
    NDVI: number | null;
    NDVI_Interpolated: number | null;
    Covered: boolean;
    Crop: string | null;
  }>;
}
