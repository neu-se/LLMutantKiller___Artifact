import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate the correct destination point using cosθ multiplication (not division)', () => {
    // Using a bearing of 45 degrees (northeast)
    // The mutation changes cosθ multiplication to division
    // At bearing=45, cos(45°) ≈ 0.707, so multiplication vs division gives different results
    const startPoint = new GeoPoint(0, 0);
    const distance = 100000; // 100 km
    const bearing = 45; // northeast

    const destination = startPoint.calculateDestination(distance, bearing);

    // The correct destination for traveling 100km at 45 degrees from (0,0)
    // should be approximately (0.6364, 0.6364) degrees
    // With the mutation (division by cosθ instead of multiplication), the result will differ significantly
    expect(destination.latitude).toBeCloseTo(0.6364, 2);
    expect(destination.longitude).toBeCloseTo(0.6364, 2);
  });
});