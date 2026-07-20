import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination point for bearing 0 degrees', () => {
    const startPoint = new GeoPoint(0, 0);
    const distance = 10000; // 10km
    const bearing = 0; // North

    const result = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // Expected result calculated using the original formula
    // With bearing=0, cosθ=1 and sinθ=0, making the mutation more obvious
    expect(result.latitude).toBeCloseTo(0.08983152841195213);
    expect(result.longitude).toBeCloseTo(0);
  });
});