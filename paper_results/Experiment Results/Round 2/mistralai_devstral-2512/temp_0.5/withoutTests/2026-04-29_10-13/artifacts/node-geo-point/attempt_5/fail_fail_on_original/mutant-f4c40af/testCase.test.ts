import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination point for given distance and bearing', () => {
    const startPoint = new GeoPoint(45, 45);
    const distance = 50000; // 50km
    const bearing = 90; // East

    const result = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // The mutation changes sinφ1 * cosδ to sinφ1 / cosδ which will produce different results
    // This test uses a 45-degree latitude where the difference will be most noticeable
    expect(result.latitude).toBeCloseTo(45.0, 1);
    expect(result.longitude).toBeCloseTo(46.1, 1);
  });
});