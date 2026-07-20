import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from GeoJSON without type or coordinates', () => {
    const point = { coordinates: [1, 2] };
    expect(() => GeoPoint.fromGeoJSON(point)).toThrowError('Object must have type and coordinates');
  });
});