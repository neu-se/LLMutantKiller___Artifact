import { GeoPoint } from "./geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should correctly calculate destination point with bearing 90 degrees', () => {
    const startPoint = new GeoPoint(0, 0);
    const result = startPoint.calculateDestination(100000, 90);
    expect(result.latitude).toBeCloseTo(0, 5);
    expect(result.longitude).toBeCloseTo(0.8983, 4);
  });
});