import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination longitude using subtraction in bearing formula', () => {
    // Starting point: latitude 45, longitude 0, traveling 100km at bearing 45 degrees
    // The mutation changes x = cosδ - sinφ1*sinφ2 to x = cosδ + sinφ1*sinφ2
    // This affects atan2(y, x) and produces a different longitude
    const startPoint = new GeoPoint(45, 0);
    const destination = startPoint.calculateDestination(100000, 45);

    // Original code produces ~0.9094; mutated code produces a different value
    expect(destination.longitude).toBeCloseTo(0.9094, 2);
  });
});