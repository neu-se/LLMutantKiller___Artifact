import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('calculateDestination mutation test', () => {
  it('should calculate correct destination point for 45 degree bearing with significant distance', () => {
    const startPoint = new GeoPoint(0, 0);
    const distance = 1000000; // 1000km
    const bearing = 45; // Northeast direction

    const result = startPoint.calculateDestination(distance, bearing);

    // With the mutation (minus sign), the coordinates would be significantly different
    // Original formula should move us northeast by about 707km in each direction
    expect(result.latitude).toBeCloseTo(6.36, 0);
    expect(result.longitude).toBeCloseTo(6.36, 0);
  });
});