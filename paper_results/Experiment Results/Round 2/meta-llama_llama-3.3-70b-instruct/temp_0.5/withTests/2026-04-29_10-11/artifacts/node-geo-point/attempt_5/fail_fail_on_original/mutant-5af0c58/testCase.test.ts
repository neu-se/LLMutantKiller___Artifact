import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should not throw an error when creating a new GeoPoint with non-numeric arguments in the mutated code', () => {
    const geoPoint = new GeoPoint('a' as any, 2);
    expect(geoPoint).not.toBeInstanceOf(GeoPoint);
  });
});