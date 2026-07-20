import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('calculateDestination mutation test', () => {
  it('should calculate correct destination point for 45 degree bearing', () => {
    const startPoint = new GeoPoint(0, 0);
    const distance = 10000; // 10km
    const bearing = 45; // Northeast direction

    const result = startPoint.calculateDestination(distance, bearing);

    // With the mutation (minus sign), the result would be significantly different
    // Original formula should move us northeast
    expect(result.latitude).toBeCloseTo(6.36, 2);
    expect(result.longitude).toBeCloseTo(6.36, 2);
  });
});