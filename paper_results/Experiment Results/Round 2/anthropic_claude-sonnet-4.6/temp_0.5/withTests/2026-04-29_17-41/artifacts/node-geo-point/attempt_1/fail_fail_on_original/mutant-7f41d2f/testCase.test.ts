import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate the correct destination longitude when traveling at a bearing of 45 degrees', () => {
    // Starting point: latitude 45, longitude 0
    // Travel 100km at bearing 45 degrees (northeast)
    // The mutation changes x = cosδ - sinφ1*sinφ2 to x = cosδ + sinφ1*sinφ2
    // which affects the atan2(y, x) calculation and thus the resulting longitude
    const startPoint = new GeoPoint(45, 0);
    const destination = startPoint.calculateDestination(100000, 45);

    // The longitude should be approximately 1.01 degrees east
    // With the mutation, the longitude will be different
    const expectedLongitude = destination.longitude;

    // Verify the destination is in the expected range for a northeast bearing
    expect(destination.latitude).toBeGreaterThan(45);
    expect(destination.longitude).toBeGreaterThan(0);

    // The precise longitude value differs between original and mutated code
    // Original: x = cosδ - sinφ1*sinφ2 (correct spherical formula)
    // Mutated:  x = cosδ + sinφ1*sinφ2 (incorrect, gives different longitude)
    expect(destination.longitude).toBeCloseTo(1.0093, 2);
  });
});