import { ParcelDetail } from '@/types/ParcelDetail';

type ParcelDayData = ParcelDetail['parcel_daily_data'][number];

export function splitDailyDataAmongCropType(dailyData: ParcelDetail['parcel_daily_data']) {
  if (dailyData.length === 0) return [];

  const segments: ParcelDayData[][] = [];
  let currentSegment: ParcelDayData[] = [];
  const currentCropType = dailyData[0].Crop;

  for (const dayData of dailyData) {
    if (currentCropType === dayData.Crop) {
      currentSegment.push(dayData);
    } else {
      segments.push(currentSegment);
      currentSegment = [dayData]
    }
  }

  segments.push(currentSegment);

  return segments;
}