import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint', () => {
  it('should calculate destination correctly for a specific case', () => {
    const point = new GeoPoint(0, 0);
    const distance = 1000; // 1 km
    const bearing = 45; // 45 degrees
    const destinationOriginal = GeoPoint.calculateDestination(point, distance, bearing);
    const destinationMutated = GeoPoint.calculateDestination({ latitude: point.latitude, longitude: point.longitude }, distance, bearing);
    expect(destinationOriginal.longitude).not.toBeCloseTo(destinationMutated.longitude, 5);
  });
});