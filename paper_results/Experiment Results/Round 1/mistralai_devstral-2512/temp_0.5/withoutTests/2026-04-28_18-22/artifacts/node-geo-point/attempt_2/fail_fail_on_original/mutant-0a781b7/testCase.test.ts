import { GeoPoint } from "./src/geo-point";

describe("GeoPoint.calculateDestination", () => {
  it("should calculate correct destination for northward movement", () => {
    const start = new GeoPoint(0, 0);
    const result = start.calculateDestination(10000, 0); // 10km north

    // With original formula: sinφ2 = sinφ1*cosδ + cosφ1*sinδ*cosθ
    // With mutated formula: sinφ2 = sinφ1*cosδ - cosφ1*sinδ*cosθ
    // The mutation would produce a significantly different latitude

    expect(result.latitude).toBeGreaterThan(0.089);
    expect(result.latitude).toBeLessThan(0.090);
    expect(result.longitude).toBe(0);
  });
});