import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(0, 0);
    const distance = 10000;
    const bearing = 45;
    const destination = GeoPoint.calculateDestination({ latitude: 0, longitude: 0 }, distance, bearing);
    const expectedLatitude = Math.asin(Math.sin(Math.radians(0)) * Math.cos(Math.radians(distance / 6371e3)) + Math.cos(Math.radians(0)) * Math.sin(Math.radians(distance / 6371e3)) * Math.cos(Math.radians(bearing)));
    expect(destination.latitude).toBeCloseTo(Math.degrees(expectedLatitude), 6);
  });
});