import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should calculate distance correctly for two points with a large difference in latitude', () => {
    const p1 = new GeoPoint(-89.99, 0);
    const p2 = new GeoPoint(89.99, 0);

    const distance = GeoPoint.calculateDistance(p1, p2);
    expect(distance).toBeCloseTo(20015088.706, 5);
  });
});