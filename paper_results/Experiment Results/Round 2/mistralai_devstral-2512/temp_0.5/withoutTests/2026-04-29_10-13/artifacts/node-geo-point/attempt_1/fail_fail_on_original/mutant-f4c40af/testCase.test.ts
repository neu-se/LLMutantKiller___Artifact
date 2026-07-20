import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination point for given distance and bearing', () => {
    const startPoint = new GeoPoint(0, 0);
    const distance = 10000; // 10km
    const bearing = 0; // North

    const result = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // Expected result should be very close to (0.08983, 0) for 10km north
    // This is a known calculation that would be affected by the mutation
    expect(result.latitude).toBeCloseTo(0.08983, 4);
    expect(result.longitude).toBeCloseTo(0, 4);
  });
});