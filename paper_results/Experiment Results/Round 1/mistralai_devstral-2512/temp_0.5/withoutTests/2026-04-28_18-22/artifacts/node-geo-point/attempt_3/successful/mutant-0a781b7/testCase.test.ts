import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe("GeoPoint.calculateDestination", () => {
  it("should calculate correct destination point for given bearing and distance", () => {
    const startPoint = new GeoPoint(0, 0);
    const distance = 10000; // 10 km
    const bearing = 0; // North

    const result = startPoint.calculateDestination(distance, bearing);

    // The mutation changes the sign in the destination calculation formula
    // Original: sinφ2 = sinφ1*cosδ + cosφ1*sinδ*cosθ
    // Mutated: sinφ2 = sinφ1*cosδ - cosφ1*sinδ*cosθ
    // This will produce different latitude values

    expect(result.latitude).toBeCloseTo(0.08993216059187306, 6);
    expect(result.longitude).toBe(0);
  });
});