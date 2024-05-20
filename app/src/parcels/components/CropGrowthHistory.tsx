'use client';

import { parse } from 'date-fns';

import { ParcelDayData } from "@/types/ParcelDayData";
import { Chart } from 'react-google-charts';
import { splitDailyDataAmongCropType } from "../utils/splitDailyDataAmongCropType";

interface Props {
  dailyData: ParcelDayData[];
}

function getColorCodeForCrop(crop: string) {
  const colorCodesOfCrops: Record<string, string> = {
    Bare: '#4285f4',
    Grass: '#0f9d58',
    'Cover Crop': '#db4437',
  };

  return colorCodesOfCrops[crop] ?? '#f4b400';
}

export function CropGrowthHistory({ dailyData }: Props) {
  const segments = splitDailyDataAmongCropType(dailyData);
  const chartData = [
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
  
  const barColors = segments.map(segment => segment[0].Crop === null ? '#000' : getColorCodeForCrop(segment[0].Crop));

  return (
    <Chart
      chartType="Timeline"
      data={chartData}
      width="100%"
      options={{
        colors: Array.from(new Set(barColors)),
        timeline: {
          showRowLabels: false,
        },
      }}
    />
  )
}