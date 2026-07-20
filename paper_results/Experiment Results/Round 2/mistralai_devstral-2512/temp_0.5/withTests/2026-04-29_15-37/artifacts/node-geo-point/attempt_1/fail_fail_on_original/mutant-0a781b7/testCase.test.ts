import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('calculateDestination mutation test', () => {
  it('should calculate correct destination point with bearing 90 degrees', () => {
    const startPoint = new GeoPoint(0, 0);
    const distance = 10000; // 10km
    const bearing = 90; // East direction

    const result = startPoint.calculateDestination(distance, bearing);

    // With the mutation (minus sign), the result would be significantly different
    // Original formula should move us east along the equator
    expect(result.latitude).toBeCloseTo(0, 2);
    expect(result.longitude).toBeCloseTo(8.983, 2);
  });
});