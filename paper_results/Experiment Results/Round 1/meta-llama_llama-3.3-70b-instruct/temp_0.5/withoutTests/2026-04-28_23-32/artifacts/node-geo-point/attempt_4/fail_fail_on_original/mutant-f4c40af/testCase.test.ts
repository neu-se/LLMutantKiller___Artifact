import { GeoPoint } from "../geo-point";

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(0, 0);
    const distance = 1000; // 1 km
    const bearing = 0; // north

    const destinationOriginal = GeoPoint.calculateDestination({ latitude: point.latitude, longitude: point.longitude }, distance, bearing);
    const destinationMutated = GeoPoint.calculateDestination({ latitude: point.latitude, longitude: point.longitude }, distance, bearing);
    expect(destinationOriginal.latitude).not.toBeCloseTo(destinationMutated.latitude, 5);
  });
});