import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('throws an error when creating a GeoPoint from GeoJSON with invalid coordinates', () => {
    const invalidPoint = {
      type: 'Point',
      coordinates: [1, 2, 3],
    };

    expect(() => GeoPoint.fromGeoJSON(invalidPoint)).toThrowError('Object must have type and coordinates');
  });
});