import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should calculate distance correctly', () => {
    const point1 = new GeoPoint(0, 0);
    const point2 = new GeoPoint(0, 0);
    const distance = GeoPoint.calculateDistance(point1, point2);
    expect(distance).toBeCloseTo(0);
    expect(GeoPoint.calculateDistance(point1, point2)).not.toBeNaN();
    expect(GeoPoint.calculateDistance(point1, point2)).not.toEqual(Infinity);
    expect(GeoPoint.calculateDistance(point1, point2)).not.toEqual(-Infinity);
  });
});