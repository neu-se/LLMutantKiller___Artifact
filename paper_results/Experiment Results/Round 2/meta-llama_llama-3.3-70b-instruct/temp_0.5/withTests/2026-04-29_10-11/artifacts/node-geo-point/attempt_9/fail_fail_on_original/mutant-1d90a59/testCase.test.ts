import { GeoPoint } from '../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should not create a GeoPoint from an object without latitude and longitude properties', () => {
    const obj = { foo: 'bar' };
    const result = () => GeoPoint.fromObject(obj);
    expect(result).toThrowError('Object must have latitude and longitude');
  });
});