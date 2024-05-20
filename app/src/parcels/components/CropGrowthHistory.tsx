'use client';

import { parse } from 'date-fns';

import { ParcelDayData } from "@/types/ParcelDayData";
import { Chart } from 'react-google-charts';
import { splitDailyDataAmongCropType } from "../utils/splitDailyDataAmongCropType";

interface Props {
  dailyData: ParcelDayData[];
}

export function CropGrowthHistory({ dailyData }: Props) {
  const segments = splitDailyDataAmongCropType(dailyData);
  const data = [
    [
      { type: "string", id: "History" },
      { type: "string", id: "Name" },
      { type: "date", id: "Start" },
      { type: "date", id: "End" },
    ],
    ...(segments.map(segment => [
      'History',
      segment[0].Crop ?? 'Unknown crop',
      parse(segment[0].Date, 'yyyy-MM-dd', new Date()),
      parse(segment[segment.length-1].Date, 'yyyy-MM-dd', new Date()),
    ])),
  ];
  
  return (
    <Chart
      chartType="Timeline"
      data={data}
      width="100%"
      options={{
        timeline: {
          showRowLabels: false,
        },
      }}
    />
  )
}