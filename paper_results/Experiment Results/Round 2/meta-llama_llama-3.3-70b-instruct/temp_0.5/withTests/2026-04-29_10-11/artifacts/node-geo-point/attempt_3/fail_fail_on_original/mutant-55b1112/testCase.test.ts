import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should calculate destination with correct formula', () => {
    const point = { latitude: 0, longitude: 0 };
    const distance = 10000;
    const bearing = 45;
    const destination = GeoPoint.calculateDestination(point, distance, bearing);
    const expectedLatitude = Math.asin(Math.sin(point.latitude * Math.PI / 180) * Math.cos(distance / 6371e3) + Math.cos(point.latitude * Math.PI / 180) * Math.sin(distance / 6371e3) * Math.cos(bearing * Math.PI / 180));
    const expectedLongitude = point.longitude * Math.PI / 180 + Math.atan2(Math.sin(bearing * Math.PI / 180) * Math.sin(distance / 6371e3) * Math.cos(point.latitude * Math.PI / 180), Math.cos(distance / 6371e3) - Math.sin(point.latitude * Math.PI / 180) * Math.sin(expectedLatitude));
    expect(destination.latitude).toBeCloseTo(expectedLatitude * 180 / Math.PI, 5);
    expect(destination.longitude).toBeCloseTo(expectedLongitude * 180 / Math.PI, 5);
  });
});