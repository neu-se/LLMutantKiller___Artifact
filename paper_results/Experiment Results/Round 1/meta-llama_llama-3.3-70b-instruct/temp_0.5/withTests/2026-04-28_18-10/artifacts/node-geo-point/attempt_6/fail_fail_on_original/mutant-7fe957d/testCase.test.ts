import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should calculate distance correctly for two points with the same latitude and a large difference in longitude', () => {
    const p1 = new GeoPoint(0, -179.99);
    const p2 = new GeoPoint(0, 179.99);

    const distance = GeoPoint.calculateDistance(p1, p2);
    expect(distance).toBeGreaterThan(20000000);
  });
});