import { GeoPoint } from './geo-point';

describe('GeoPoint', () => {
  it('should create an instance from an object', () => {
    const object = { latitude: 51.5, longitude: -0.15 };
    expect(() => GeoPoint.fromObject(object)).not.toThrow();
  });
});