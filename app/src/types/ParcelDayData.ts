export interface ParcelDayData {
  Date: string;
  NDVI: number | null;
  NDVI_Interpolated: number | null;
  Covered: boolean;
  Crop: string | null;
}
