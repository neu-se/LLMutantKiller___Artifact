import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should not throw an error when creating a GeoPoint from GeoJSON with incorrect type in mutated code', () => {
    expect(() => GeoPoint.fromGeoJSON({
      type: 'LineString',
      coordinates: [-0.15, 51.5]
    })).not.toThrowError();
  });
});