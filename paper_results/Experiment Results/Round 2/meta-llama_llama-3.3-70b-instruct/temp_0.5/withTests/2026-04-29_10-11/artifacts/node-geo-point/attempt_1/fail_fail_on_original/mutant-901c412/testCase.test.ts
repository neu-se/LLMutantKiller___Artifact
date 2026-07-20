import { GeoPoint } from '../../src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error for latitude equal to -90', () => {
    expect(() => new GeoPoint(-90, 0)).toThrowError('bad latitude value');
  });
});