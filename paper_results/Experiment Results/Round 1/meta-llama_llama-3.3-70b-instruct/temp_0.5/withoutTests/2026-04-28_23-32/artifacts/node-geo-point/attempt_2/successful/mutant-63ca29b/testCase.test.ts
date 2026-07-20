import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('throws an error when creating a GeoPoint from GeoJSON with invalid coordinates', () => {
    const invalidPoint = {
      type: 'Point',
      coordinates: [1, 2, 3],
    };

    expect(() => GeoPoint.fromGeoJSON(invalidPoint as any)).toThrowError('coordinates must be an array and contain 2 elements');
  });
});