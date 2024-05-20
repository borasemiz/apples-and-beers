'use client';

import { MapContainer, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";

export function ParcelLocationOnMap() {
  return (
    <div className="flex justify-center w-full overflow-hidden h-96 mb-4">
      <MapContainer center={[51.505, -0.09]} zoom={12}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}
