import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should calculate distance between two points correctly', () => {
    const point1 = new GeoPoint(0, 0);
    const point2 = new GeoPoint(0, 0);
    const distance = GeoPoint.calculateDistance(point1, point2);
    expect(distance).toBe(0);
    const point3 = new GeoPoint(90, 0);
    const distance2 = GeoPoint.calculateDistance(point1, point3);
    expect(distance2).toBeGreaterThan(0);
    expect(distance2).toBeLessThan(20000 * 1000);
    const point4 = new GeoPoint(0, 90);
    const distance3 = GeoPoint.calculateDistance(point1, point4);
    expect(distance3).toBeGreaterThan(0);
    expect(distance3).toBeLessThan(20000 * 1000);
    expect(distance2).toBeCloseTo(distance3, 100);
    const point5 = new GeoPoint(91, 0);
    expect(() => GeoPoint.calculateDistance(point1, point5)).toThrow(RangeError);
    const point6 = new GeoPoint(-91, 0);
    expect(() => GeoPoint.calculateDistance(point1, point6)).toThrow(RangeError);
    const point7 = new GeoPoint(0, 91);
    expect(() => GeoPoint.calculateDistance(point1, point7)).toThrow(RangeError);
    const point8 = new GeoPoint(0, -91);
    expect(() => GeoPoint.calculateDistance(point1, point8)).toThrow(RangeError);
    const point9 = new GeoPoint(0, 181);
    expect(() => GeoPoint.calculateDistance(point1, point9)).toThrow(RangeError);
    const point10 = new GeoPoint(0, -181);
    expect(() => GeoPoint.calculateDistance(point1, point10)).toThrow(RangeError);
  });
});