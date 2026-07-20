import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDistance', () => {
  it('should correctly calculate distance between two points with floating point precision', () => {
    const point1 = new GeoPoint(48.8566, 2.3522); // Paris
    const point2 = new GeoPoint(51.5074, -0.1278); // London
    const distance = GeoPoint.calculateDistance(point1, point2);
    expect(distance).toBeCloseTo(343633.56, -1);
  });
});