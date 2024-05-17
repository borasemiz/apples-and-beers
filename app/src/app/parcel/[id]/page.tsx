'use client';

import { getParcelDetails } from "@/app/actions/getParcelDetails";
import { ParcelDetail } from "@/types/ParcelDetail";
import { useEffect, useState } from "react";

type ParcelDailyData = ParcelDetail['parcel_daily_data'][number];

interface Props {
  params: {
    id: string;
  };
}

export default function ParcelID({ params: { id: parcelId } }: Props) {
  const [data, setData] = useState<ParcelDetail>();
  const [segments, setSegments] = useState<ParcelDailyData[][]>();

  useEffect(() => {
    getParcelDetails({ parcelId }).then(data => setData(data)).catch(e => console.error(e));
  }, [parcelId]);

  useEffect(() => {
    if (data === undefined) return;

    const segments: ParcelDailyData[][] = [];
    let segment: ParcelDailyData[] = [];
    let cropType = data.parcel_daily_data[0].Crop;
    
    for (const dayData of data.parcel_daily_data) {
      if (dayData.Crop !== cropType) {
        segments.push(segment);
        segment = [dayData];
        cropType = dayData.Crop;
      } else {
        segment.push(dayData);
      }
    }

    segments.push(segment);
    setSegments(segments);
  }, [data]);

  return <pre><code>{JSON.stringify(segments, null, 2)}</code></pre>;
}