import { getParcelDetails } from "@/app/actions/getParcelDetails";
import { CropGrowthHistory } from "@/parcels/components/CropGrowthHistory";
import { splitDailyDataAmongCropType } from "@/parcels/utils/splitDailyDataAmongCropType";

interface Props {
  params: {
    id: string;
  };
}

export default async function ParcelID({ params: { id: parcelId } }: Props) {
  const { parcel_daily_data: parcelDailyData } = await getParcelDetails({ parcelId });

  return <CropGrowthHistory dailyData={parcelDailyData} />;
}