import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint instance calculateDistance', () => {
  it('should return the distance between two points when called as an instance method', () => {
    const p1 = new GeoPoint(51.5, -0.15);
    const p2 = new GeoPoint(51.6, -0.16);

    const distance = p1.calculateDistance(p2);

    expect(distance).toBeDefined();
    expect(typeof distance).toBe('number');
    expect(Math.round(distance)).toBe(11142);
  });
});