import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should correctly calculate destination point with bearing 0 degrees and distance 1000000m', () => {
    const startPoint = new GeoPoint(0, 0);
    const result = GeoPoint.calculateDestination(startPoint, 1000000, 0);
    expect(result.latitude).toBeCloseTo(8.993216, 5);
    expect(result.longitude).toBeCloseTo(0, 5);
  });
});