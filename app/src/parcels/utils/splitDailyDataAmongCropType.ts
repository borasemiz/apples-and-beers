import { ParcelDetail } from '@/types/ParcelDetail';
import { ParcelDayData } from '@/types/ParcelDayData';

export function splitDailyDataAmongCropType(dailyData: ParcelDetail['parcel_daily_data']) {
  if (dailyData.length === 0) return [];

  const segments: ParcelDayData[][] = [];
  let currentSegment: ParcelDayData[] = [];
  let currentCropType = dailyData[0].Crop;

  for (const dayData of dailyData) {
    if (currentCropType === dayData.Crop) {
      currentSegment.push(dayData);
    } else {
      segments.push(currentSegment);
      currentSegment = [dayData];
      currentCropType = dayData.Crop;
    }
  }

  segments.push(currentSegment);

  return segments;
}