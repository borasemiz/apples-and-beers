'use client';

import { MapContainer, Marker, Polygon, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";

interface Props {
  center: [number, number];
  areaPoints: [number, number][];
}

export function ParcelLocationOnMap({ center, areaPoints }: Props) {
  return (
    <div className="flex justify-center w-full overflow-hidden h-[32rem] mb-4">
      <MapContainer center={center} zoom={16}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center} />

        <Polygon pathOptions={{ color: 'purple' }} positions={areaPoints} />
      </MapContainer>
    </div>
  );
}
