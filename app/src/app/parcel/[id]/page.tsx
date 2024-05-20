import { getParcelDetails } from "@/app/actions/getParcelDetails";
import { CropGrowthHistory } from "@/parcels/components/CropGrowthHistory";
import { ParcelLocationOnMap } from "@/parcels/components/ParcelLocationOnMap";

interface Props {
  params: {
    id: string;
  };
}

export const dynamic = 'force-dynamic';

export default async function ParcelID({ params: { id: parcelId } }: Props) {
  const { parcel_daily_data: parcelDailyData } = await getParcelDetails({ parcelId });

  return (
    <div>
      <ParcelLocationOnMap />
      <CropGrowthHistory dailyData={parcelDailyData} />
    </div>
  );
}