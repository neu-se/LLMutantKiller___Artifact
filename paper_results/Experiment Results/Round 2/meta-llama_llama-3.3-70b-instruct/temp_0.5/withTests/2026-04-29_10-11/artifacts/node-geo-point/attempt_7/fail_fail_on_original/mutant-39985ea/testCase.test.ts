import { GeoPoint } from '../../../src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating from object with missing properties', () => {
    const object = { latitude: 51.5 };
    try {
      GeoPoint.fromObject(object);
    } catch (error) {
      expect(error.message).toBe('Object must have latitude and longitude');
    }
  });
});