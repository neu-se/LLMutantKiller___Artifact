import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should not throw an error when creating a GeoPoint from GeoJSON with a null argument in the mutated code', () => {
    const point = null;
    expect(() => GeoPoint.fromGeoJSON(point)).not.toThrow();
  });
});