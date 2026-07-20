import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('calculateDestination mutation test', () => {
  it('should calculate correct destination point for northward movement', () => {
    const startPoint = new GeoPoint(0, 0);
    const distance = 10000; // 10km
    const bearing = 0; // North direction

    const result = startPoint.calculateDestination(distance, bearing);

    // With the mutation (minus sign), the result would be significantly different
    // Original formula should move us north along the prime meridian
    expect(result.latitude).toBeCloseTo(8.983, 2);
    expect(result.longitude).toBeCloseTo(0, 2);
  });
});