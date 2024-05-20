import { getParcelDetails } from "@/app/actions/getParcelDetails";
import { CropGrowthHistory } from "@/parcels/components/CropGrowthHistory";
import { ParcelLocationOnMap } from "@/parcels/components/ParcelLocationOnMap";
import { Card } from '@/ui/Card';

interface Props {
  params: {
    id: string;
  };
}

export const dynamic = 'force-dynamic';

export default async function ParcelID({ params: { id: parcelId } }: Props) {
  const {
    parcel_daily_data: parcelDailyData,
    parcel_location: {
      geometry: {
        coordinates: parcelCoordinates
      }
    },
    parcel_geometry: {
      geometry: {
        coordinates: parcelBoundryCoordinates,
      }
    },
  } = await getParcelDetails({ parcelId });

  return (
    <>
      <Card
        title="Parcel Location"
        description="Here, you can see the parcel's location on the map. The marker shows the center point of the parcel, and the are in the purple lines are the parcel."
      >
        <ParcelLocationOnMap
          center={parcelCoordinates}
          areaPoints={parcelBoundryCoordinates}
        />
      </Card>

      <Card
        title="Vegetation Timeline"
        description="Below, you can see the history of the area thoughout the years. In each bar, you can see which type of vegetation was grown."
      >
        <CropGrowthHistory dailyData={parcelDailyData} />
      </Card>
    </>
  );
}