import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint instance calculateDistance', () => {
  it('should return the distance between two geo points', () => {
    const point1 = new GeoPoint(51.5074, -0.1278); // London
    const point2 = new GeoPoint(48.8566, 2.3522);  // Paris

    const distance = point1.calculateDistance(point2);

    expect(distance).toBeGreaterThan(0);
    expect(typeof distance).toBe('number');
    // Distance between London and Paris is approximately 340km
    expect(distance).toBeCloseTo(340000, -4);
  });
});