'use client';

import { getParcelDetails } from "@/app/actions/getParcelDetails";
import { splitDailyDataAmongCropType } from "@/parcels/utils/splitDailyDataAmongCropType";
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

    setSegments(splitDailyDataAmongCropType(data.parcel_daily_data));
  }, [data]);

  return <pre><code>{JSON.stringify(segments, null, 2)}</code></pre>;
}