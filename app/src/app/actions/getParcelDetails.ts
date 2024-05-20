'use server';

import { ParcelDetail } from "@/types/ParcelDetail";

interface Params {
  parcelId: string;
}

export async function getParcelDetails({ parcelId }: Params): Promise<ParcelDetail> {
  const response = await fetch(`${process.env.API_URL}/parcels/${parcelId}`);

  if (!response.ok) throw response.status;

  return response.json();
}