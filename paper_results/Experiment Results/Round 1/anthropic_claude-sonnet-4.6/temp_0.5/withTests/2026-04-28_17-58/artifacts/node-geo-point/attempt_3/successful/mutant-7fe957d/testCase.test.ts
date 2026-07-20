import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.calculateDistance', () => {
  it('should handle floating point precision where r exceeds 1 for same-point distance calculation', () => {
    // Find a latitude where cos²(x) + sin²(x) > 1 due to floating point
    // We can verify: Math.cos(x)**2 + Math.sin(x)**2 > 1 for some x
    // e.g., x = Math.PI/4 (45 degrees in radians, but we need degrees input)
    // deg2rad(lat) where the result causes floating point > 1
    
    // Brute force check which latitude triggers r > 1
    let triggerLat: number | null = null;
    for (let lat = 0; lat <= 90; lat += 0.1) {
      const rad = lat * Math.PI / 180;
      const r = Math.cos(rad) * Math.cos(rad) * Math.cos(0) + Math.sin(rad) * Math.sin(rad);
      if (r > 1) {
        triggerLat = lat;
        break;
      }
    }

    if (triggerLat === null) {
      // If no exact trigger found with 0.1 steps, try more values
      for (let i = 0; i <= 9000; i++) {
        const lat = i / 100;
        const rad = lat * Math.PI / 180;
        const r = Math.cos(rad) * Math.cos(rad) * Math.cos(0) + Math.sin(rad) * Math.sin(rad);
        if (r > 1) {
          triggerLat = lat;
          break;
        }
      }
    }

    expect(triggerLat).not.toBeNull();

    const p1 = new GeoPoint(triggerLat!, 0);
    const p2 = new GeoPoint(triggerLat!, 0);

    const distance = GeoPoint.calculateDistance(p1, p2);
    expect(isNaN(distance)).toBe(false);
    expect(distance).toBe(0);
  });
});