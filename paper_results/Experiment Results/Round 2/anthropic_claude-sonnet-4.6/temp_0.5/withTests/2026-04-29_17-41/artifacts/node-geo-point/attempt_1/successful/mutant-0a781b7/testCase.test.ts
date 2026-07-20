import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDestination mutation detection', () => {
  it('should calculate the correct destination point when traveling north from a known location', () => {
    // Travel 100km north from (0, 0)
    // The mutation changes sinφ2 = sinφ1 * cosδ + cosφ1 * sinδ * cosθ
    // to sinφ2 = sinφ1 * cosδ - cosφ1 * sinδ * cosθ
    // This will produce a wrong latitude for northward travel
    const origin = new GeoPoint(0, 0);
    const distance = 100000; // 100 km
    const bearing = 0; // North

    const destination = GeoPoint.calculateDestination(origin, distance, bearing);

    // Traveling north from equator should increase latitude
    // Expected latitude is approximately 0.8993 degrees north
    expect(destination.latitude).toBeGreaterThan(0);
    expect(destination.longitude).toBeCloseTo(0, 5);
    // With the original formula, latitude should be approximately 0.8993
    expect(destination.latitude).toBeCloseTo(0.8993, 3);
  });
});