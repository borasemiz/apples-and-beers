import typing as t

import pymongo
from beanie import Document
from pydantic import BaseModel, Field, field_validator, validator
from pymongo import IndexModel
from typing import List, Optional
from datetime import date, datetime


class Geometry(BaseModel):
    type: str
    coordinates: t.Any


class Parcel(BaseModel):
    objectid: int
    area: float = Field(description="Area of the parcel in hectares")
    crop_type: str
    geometry: Geometry


class ParcelDB(Document, Parcel):
    class Settings:
        name = "Parcel"
        indexes = [
            IndexModel([("objectid", pymongo.ASCENDING)], unique=True),
            IndexModel([("area", pymongo.ASCENDING)]),
            IndexModel([("crop_type", pymongo.ASCENDING)]),
            IndexModel([("geometry", pymongo.GEOSPHERE)]),
        ]


class PointGeometry(BaseModel):
    coordinates: List
    type: t.Literal["Point"]


class GeoJSONPointFeature(BaseModel):
    type: t.Literal["Feature"]
    properties: dict
    geometry: PointGeometry


class PolygonGeometry(BaseModel):
    coordinates: List
    type: str = t.Literal["Polygon"]


class GeoJSONPolygonFeature(BaseModel):
    type: t.Literal["Feature"]
    properties: dict
    geometry: PolygonGeometry


class DailyData(BaseModel):
    Date: date = Field(description="Date of the data.")
    NDVI: Optional[float] = Field(description="Normalized Difference Vegetation Index. You can find more information about NDVI here: https://en.wikipedia.org/wiki/Normalized_difference_vegetation_index")
    NDVI_Interpolated: Optional[float] = Field(description="Interpolated NDVI value. A satellite may not pass over the same location every day, so we interpolate the NDVI values to get a daily value.")
    Covered: Optional[bool] = Field(description="Whether the parcel is covered by vegetation or not.")
    Crop: Optional[str] = Field(description="Type of crop in the parcel.")

    @field_validator("Date", mode="before")
    def parse_date(cls, value):
        return (
            datetime.strptime(value, "%Y-%m-%d").date()
            if isinstance(value, str)
            else value
        )


class ParcelResponse(BaseModel):
    parcel_id: int = Field(description="Unique identifier of the parcel.")
    parcel_name: str = Field(description="Name of the parcel. This is a user-defined field.")
    parcel_owner: str = Field(description="Owner of the parcel. Usually the name of the farmer, sometimes the name of the cooperative.")
    parcel_area: float = Field(description="Area of the parcel.")
    parcel_area_unit: str = Field(description="Unit of the area. Usually hectares.")
    parcel_location: GeoJSONPointFeature = Field(description="Location of the parcel. Defined as latitude and longitude. of the centroid of the parcel.")
    parcel_geometry: GeoJSONPolygonFeature = Field(description="Geometry of the parcel. This is a GeoJSON object.")
    parcel_daily_data: List[DailyData]


class Message(BaseModel):
    message: str
