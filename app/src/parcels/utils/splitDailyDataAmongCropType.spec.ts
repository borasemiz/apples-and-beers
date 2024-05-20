import { describe, expect, it } from 'vitest';

import { ParcelDetail } from '@/types/ParcelDetail';
import { splitDailyDataAmongCropType } from './splitDailyDataAmongCropType';

describe('splitDailyDataAmongCropType', () => {
  it('should return array containing arrays of daily data', () => {
    const dailyData: ParcelDetail['parcel_daily_data'] = [
      {
        Date: "2020-02-22",
        NDVI: null,
        NDVI_Interpolated: 0.3197707006,
        Covered: true,
        Crop: "Grass"
      },
    ];
    const result = splitDailyDataAmongCropType(dailyData);
    expect(result).toEqual([
      [
        {
          Date: "2020-02-22",
          NDVI: null,
          NDVI_Interpolated: 0.3197707006,
          Covered: true,
          Crop: "Grass"
        },
      ]
    ]);
  });

  it('each array should have the same crop type', () => {
    const dailyData: ParcelDetail['parcel_daily_data'] = [
      {
        Date: "2020-02-22",
        NDVI: null,
        NDVI_Interpolated: 0.3197707006,
        Covered: true,
        Crop: "Grass"
      },
      {
        Date: "2020-02-22",
        NDVI: null,
        NDVI_Interpolated: 0.3197707006,
        Covered: true,
        Crop: "Grass"
      },
      {
        Date: "2020-02-22",
        NDVI: null,
        NDVI_Interpolated: 0.3197707006,
        Covered: true,
        Crop: "Bare"
      },
      {
        Date: "2020-02-22",
        NDVI: null,
        NDVI_Interpolated: 0.3197707006,
        Covered: true,
        Crop: "Rice"
      },
    ];
    const result = splitDailyDataAmongCropType(dailyData);
    expect(result).toEqual([
      [
        {
          Date: "2020-02-22",
          NDVI: null,
          NDVI_Interpolated: 0.3197707006,
          Covered: true,
          Crop: "Grass"
        },
        {
          Date: "2020-02-22",
          NDVI: null,
          NDVI_Interpolated: 0.3197707006,
          Covered: true,
          Crop: "Grass"
        },
      ],
      [
        {
          Date: "2020-02-22",
          NDVI: null,
          NDVI_Interpolated: 0.3197707006,
          Covered: true,
          Crop: "Bare"
        }
      ],
      [
        {
          Date: "2020-02-22",
          NDVI: null,
          NDVI_Interpolated: 0.3197707006,
          Covered: true,
          Crop: "Rice"
        },
      ],
    ]);
  });

  it('should return an empty array if the provided daily data is empty', () => {
    expect(splitDailyDataAmongCropType([])).toEqual([]);
  });
});