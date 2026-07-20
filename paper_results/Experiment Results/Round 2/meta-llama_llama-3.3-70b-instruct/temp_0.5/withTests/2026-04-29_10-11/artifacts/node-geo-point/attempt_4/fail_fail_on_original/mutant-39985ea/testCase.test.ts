import { GeoPoint } from './geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating from object with missing properties in the mutated code', () => {
    const object = { latitude: 51.5 };
    expect(() => GeoPoint.fromObject(object)).toThrowError('Object must have latitude and longitude');
  });
});