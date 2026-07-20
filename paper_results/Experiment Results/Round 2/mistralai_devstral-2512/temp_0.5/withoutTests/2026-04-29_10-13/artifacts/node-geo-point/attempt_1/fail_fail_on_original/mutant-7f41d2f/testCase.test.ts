import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination point for given distance and bearing', () => {
    const startPoint = new GeoPoint(0, 0);
    const distance = 10000; // 10 km
    const bearing = 90; // East

    const result = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // Expected result should be close to (0, 0.08983) when moving 10km east from equator
    expect(result.latitude).toBeCloseTo(0, 4);
    expect(result.longitude).toBeCloseTo(0.08983, 4);
  });
});