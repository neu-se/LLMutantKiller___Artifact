import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination point for given distance and bearing', () => {
    const startPoint = new GeoPoint(45, 0);
    const distance = 100000; // 100km
    const bearing = 45; // Northeast

    const result = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // The mutation changes sinφ1 * cosδ to sinφ1 / cosδ which will produce different results
    // especially noticeable with larger distances and non-zero bearings
    expect(result.latitude).toBeCloseTo(46.543, 3);
    expect(result.longitude).toBeCloseTo(1.182, 3);
  });
});