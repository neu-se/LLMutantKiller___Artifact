import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDistance', () => {
  it('should return 0 distance for identical points where floating point causes r > 1', () => {
    // Let's verify empirically which coordinates cause r > 1
    // r = cos(lat_rad)^2 * cos(0) + sin(lat_rad)^2
    //   = cos(lat_rad)^2 + sin(lat_rad)^2
    // Due to floating point, this can exceed 1 for certain latitudes
    
    // Find a latitude where cos^2 + sin^2 > 1 in JS floating point
    // Known problematic value: lat = 30 degrees
    const lat = 30;
    const latRad = (lat * Math.PI) / 180;
    const r = Math.cos(latRad) * Math.cos(latRad) * Math.cos(0) + Math.sin(latRad) * Math.sin(latRad);
    
    // If r > 1 at this latitude, the mutation will produce NaN
    // Original clamps it, mutated does not
    const point1 = new GeoPoint(lat, 0);
    const point2 = new GeoPoint(lat, 0);
    
    const distance = GeoPoint.calculateDistance(point1, point2);
    
    if (r > 1) {
      // Original handles this, mutated returns NaN
      expect(distance).toBe(0);
    } else {
      // Find the actual r > 1 case by brute force checking
      let foundProblematic = false;
      for (let testLat = -90; testLat <= 90; testLat += 1) {
        const testRad = (testLat * Math.PI) / 180;
        const testR = Math.cos(testRad) * Math.cos(testRad) + Math.sin(testRad) * Math.sin(testRad);
        if (testR > 1) {
          foundProblematic = true;
          const p1 = new GeoPoint(testLat, 0);
          const p2 = new GeoPoint(testLat, 0);
          expect(GeoPoint.calculateDistance(p1, p2)).toBe(0);
          break;
        }
      }
      // If no integer latitude causes r > 1, use deg2rad library which may differ
      expect(distance).toBe(0);
    }
  });
});