import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDistance', () => {
  it('should return a valid number (not NaN) when calculating distance between two identical points at a latitude where floating point causes r > 1', () => {
    // At certain latitudes, floating point arithmetic causes:
    // cos(lat)^2 + sin(lat)^2 to slightly exceed 1
    // The original code clamps r to 1 before passing to acos
    // The mutated code removes this clamping, causing acos(r > 1) = NaN
    // lat=45 degrees is a known case where this can occur
    const p1 = new GeoPoint(45, 90);
    const p2 = new GeoPoint(45, 90);

    const distance = GeoPoint.calculateDistance(p1, p2);

    expect(distance).not.toBeNaN();
    expect(distance).toBe(0);
  });
});