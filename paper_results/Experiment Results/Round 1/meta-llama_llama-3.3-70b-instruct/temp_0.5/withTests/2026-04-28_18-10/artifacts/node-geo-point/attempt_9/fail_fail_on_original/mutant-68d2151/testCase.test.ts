import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should calculate destination with correct formula', () => {
    const point = new GeoPoint(0, 0);
    const destination = point.calculateDestination(10000, 45);
    const expectedLatitude = 0.08993216059187306;
    const expectedLongitude = 0.08993216059187306;
    expect(destination.latitude).toBeCloseTo(expectedLatitude, 8);
    expect(destination.longitude).toBeCloseTo(expectedLongitude, 8);
  });
});