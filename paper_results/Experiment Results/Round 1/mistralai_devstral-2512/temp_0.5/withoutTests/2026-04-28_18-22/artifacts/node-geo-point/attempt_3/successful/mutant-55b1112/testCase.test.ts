import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.calculateDestination', () => {
  it('should calculate correct destination point for bearing of 90 degrees', () => {
    const coordinate = { latitude: 0, longitude: 0 };
    const distance = 10000; // 10 km
    const bearing = 90; // East direction

    const result = GeoPoint.calculateDestination(coordinate, distance, bearing);

    // For bearing 90 degrees (east), cosθ = cos(90°) = 0
    // Original formula: sinφ2 = sinφ1*cosδ + cosφ1*sinδ*cosθ = 0 + 1*sinδ*0 = 0
    // Mutated formula: sinφ2 = sinφ1*cosδ + cosφ1*sinδ/cosθ = 0 + sinδ/0 = Infinity
    // This should cause the mutated version to produce NaN or Infinity
    expect(result.latitude).toBeCloseTo(0, 3);
    expect(result.longitude).toBeCloseTo(0.0899, 3);
  });
});