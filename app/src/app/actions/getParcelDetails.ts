'use server';

import { ParcelDetail } from "@/types/ParcelDetail";

interface Params {
  parcelId: string;
}

export async function getParcelDetails({ parcelId }: Params): Promise<ParcelDetail> {
  const response = await fetch(`http://localhost:8080/parcels/${parcelId}`);

  if (!response.ok) throw response.status;

  return response.json();
}