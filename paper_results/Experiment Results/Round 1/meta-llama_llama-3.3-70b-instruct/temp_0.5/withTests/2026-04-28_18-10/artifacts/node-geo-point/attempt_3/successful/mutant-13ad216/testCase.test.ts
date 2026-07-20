import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from a GeoJSON object with an invalid type', () => {
    const invalidPoint = {
      type: 'LineString',
      coordinates: [-0.15, 51.5]
    };

    expect(() => GeoPoint.fromGeoJSON(invalidPoint)).toThrowError();
  });
});