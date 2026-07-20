import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDestination mutation detection', () => {
  it('should calculate the correct destination point using multiplication (not division) for x', () => {
    // Using a point where sinφ1 * sinφ2 and sinφ1 / sinφ2 would differ significantly
    // Starting from London area, heading north-east
    const startPoint = new GeoPoint(51.5, -0.15);
    const distance = 100000; // 100 km
    const bearing = 45; // north-east

    const destination = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // The correct destination should be approximately:
    // latitude ~52.13, longitude ~1.07
    // With the mutation (division instead of multiplication), the result will be different

    // Verify latitude is in expected range for correct calculation
    expect(destination.latitude).toBeGreaterThan(52.0);
    expect(destination.latitude).toBeLessThan(52.3);

    // Verify longitude is in expected range for correct calculation
    expect(destination.longitude).toBeGreaterThan(0.8);
    expect(destination.longitude).toBeLessThan(1.3);

    // More precise check that will fail with the mutation
    expect(Math.round(destination.latitude * 100) / 100).toBeCloseTo(52.13, 1);
    expect(Math.round(destination.longitude * 100) / 100).toBeCloseTo(1.07, 1);
  });
});