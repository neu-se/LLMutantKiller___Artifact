import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination for eastward movement', () => {
    const start = new GeoPoint(0, 0);
    const distance = 100000; // 100km east
    const bearing = 90; // East

    const result = start.calculateDestination(distance, bearing);

    // With original code (λ1 + atan2), we should get positive longitude
    // With mutated code (λ1 - atan2), we would get negative longitude
    expect(result.longitude).toBeGreaterThan(0);
    expect(result.latitude).toBeCloseTo(0, 4);
  });
});