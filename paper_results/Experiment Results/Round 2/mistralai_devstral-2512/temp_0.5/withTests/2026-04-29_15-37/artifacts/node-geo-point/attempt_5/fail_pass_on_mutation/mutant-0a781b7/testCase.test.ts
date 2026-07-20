import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('calculateDestination mutation test', () => {
  it('should calculate correct destination point for 90 degree bearing at equator', () => {
    const startPoint = new GeoPoint(0, 0);
    const distance = 100000; // 100km
    const bearing = 90; // East direction

    const result = startPoint.calculateDestination(distance, bearing);

    // With the mutation (minus sign), the longitude would be negative instead of positive
    expect(result.longitude).toBeGreaterThan(0);
    expect(result.latitude).toBeCloseTo(0, 1);
  });
});