import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDistance', () => {
  it('should return 0 for two identical points at the equator where floating point may cause r > 1', () => {
    // For identical points at latitude=0, longitude=0:
    // point1Rad = 0, point2Rad = 0
    // a = 0
    // b = cos(0)*cos(0)*cos(0) = 1*1*1 = 1
    // c = sin(0)*sin(0) = 0
    // r = 1 + 0 = 1 => acos(1) = 0
    // But at other coordinates, floating point can push r slightly above 1
    
    // Try a point where cos and sin values combine to give r slightly > 1
    // lat=45, lon=45 identical points:
    // point1Rad = point2Rad = deg2rad(45)
    // a = 0
    // b = cos(45deg)^2 * cos(0) = 0.5 * 1 = 0.5
    // c = sin(45deg)^2 = 0.5
    // r = 0.5 + 0.5 = 1.0 exactly in theory, but floating point may give r > 1
    
    const point1 = new GeoPoint(45, 45);
    const point2 = new GeoPoint(45, 45);
    
    const distance = GeoPoint.calculateDistance(point1, point2);
    
    // Original: clamps r to 1 if r > 1, so acos(1) = 0, distance = 0
    // Mutated: no clamping, if r > 1 due to float, acos(r) = NaN
    expect(isNaN(distance)).toBe(false);
    expect(distance).toBe(0);
  });
});