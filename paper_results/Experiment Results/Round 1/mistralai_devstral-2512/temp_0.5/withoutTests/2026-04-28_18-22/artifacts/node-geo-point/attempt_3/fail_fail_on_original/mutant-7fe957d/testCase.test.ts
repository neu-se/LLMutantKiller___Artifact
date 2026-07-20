import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDistance', () => {
  it('should correctly calculate distance between two points that produce r > 1', () => {
    const point1 = new GeoPoint(0, 0);
    const point2 = new GeoPoint(0.1, 0.1);
    const distance = GeoPoint.calculateDistance(point1, point2);
    expect(distance).toBeCloseTo(15724.93, 1);
  });
});