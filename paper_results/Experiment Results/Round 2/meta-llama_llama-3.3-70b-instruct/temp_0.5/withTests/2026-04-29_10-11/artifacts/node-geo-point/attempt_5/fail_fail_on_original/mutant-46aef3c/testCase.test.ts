import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should not throw an error when creating a GeoPoint with a valid longitude', () => {
    expect(() => new GeoPoint(0, 180)).not.toThrow();
  });
});