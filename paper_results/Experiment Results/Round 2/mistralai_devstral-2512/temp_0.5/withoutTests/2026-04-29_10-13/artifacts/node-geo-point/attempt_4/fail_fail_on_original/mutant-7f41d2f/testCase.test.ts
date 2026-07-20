import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination for southward movement from north pole region', () => {
    const startPoint = new GeoPoint(85, 0); // Near north pole
    const distance = 100000; // 100 km south
    const bearing = 180; // South

    const result = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // With original formula: x = cosδ - sinφ1 * sinφ2
    // With mutated formula: x = cosδ + sinφ1 * sinφ2
    // The mutation will cause significant longitude drift when moving south from high latitudes
    expect(result.latitude).toBeCloseTo(83.89, 2);
    expect(result.longitude).toBeCloseTo(0, 1);
  });
});