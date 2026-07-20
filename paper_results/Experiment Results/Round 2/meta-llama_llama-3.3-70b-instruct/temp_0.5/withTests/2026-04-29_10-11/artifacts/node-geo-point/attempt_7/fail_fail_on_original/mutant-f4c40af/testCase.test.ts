import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should calculate destination correctly', () => {
    const point = new GeoPoint(0, 0);
    const destination1 = GeoPoint.calculateDestination({ latitude: 0, longitude: 0 }, 10000, 0);
    const destination2 = GeoPoint.calculateDestination({ latitude: 0, longitude: 0 }, 10000, 0);
    expect(destination1.latitude).toBeCloseTo(destination2.latitude, 4);
    expect(destination1.longitude).toBeCloseTo(destination2.longitude, 4);
    const mutatedDestination = GeoPoint.calculateDestination({ latitude: 0, longitude: 0 }, 10000, 0);
    expect(mutatedDestination.latitude).not.toBeCloseTo(destination1.latitude, 4);
  });
});