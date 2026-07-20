import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination point for bearing 90 degrees', () => {
    const startPoint = new GeoPoint(0, 0);
    const distance = 10000; // 10km
    const bearing = 90; // East

    const result = GeoPoint.calculateDestination(startPoint, distance, bearing);

    // Expected result calculated using the original formula
    // With bearing=90, cosθ=0 and sinθ=1, making the mutation clearly visible
    expect(result.latitude).toBeCloseTo(0);
    expect(result.longitude).toBeCloseTo(0.08983152841195213);
  });
});