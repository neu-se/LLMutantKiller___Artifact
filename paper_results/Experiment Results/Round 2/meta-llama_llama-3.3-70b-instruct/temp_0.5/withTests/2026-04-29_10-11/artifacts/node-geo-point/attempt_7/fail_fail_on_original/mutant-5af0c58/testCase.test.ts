import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should create a new GeoPoint without throwing an error', () => {
    const geoPoint = new GeoPoint(1, 2);
    expect(geoPoint.latitude).toBe(1);
    expect(geoPoint.longitude).toBe(2);
  });
});