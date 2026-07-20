import { GeoPoint } from '../../../src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating from object with missing properties in the mutated code', () => {
    const object = { latitude: 51.5 };
    expect(() => GeoPoint.fromObject(object)).toThrowError();
    const object2 = { latitude: 51.5, longitude: -0.15 };
    expect(() => GeoPoint.fromObject(object2)).not.toThrowError();
  });
});