import { GeoPoint } from '../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point';

describe('GeoPoint', () => {
  it('should throw an error when creating a GeoPoint from an object that is not an object', () => {
    expect(() => GeoPoint.fromObject(null)).toThrow(TypeError);
    expect(() => GeoPoint.fromGeoJSON(null)).toThrow(TypeError);
    const obj = { foo: 'bar' };
    obj.toString = () => '[object Object]';
    expect(() => GeoPoint.fromObject(obj.toString())).toThrow(TypeError);
  });
});