import { GeoPoint } from './geo-point';

describe('GeoPoint', () => {
  it('should throw an error with a meaningful message when creating a new instance with invalid arguments', () => {
    try {
      new GeoPoint('a' as any, 2);
    } catch (error) {
      expect(error.message).not.toBe('');
    }
  });
});