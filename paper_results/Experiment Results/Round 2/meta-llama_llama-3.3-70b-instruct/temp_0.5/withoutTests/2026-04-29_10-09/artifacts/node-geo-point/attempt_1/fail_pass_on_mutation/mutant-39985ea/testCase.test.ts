import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint class', () => {
  it('should throw TypeError when creating GeoPoint from object without checking if the object is valid', () => {
    const object = 'not an object';
    expect(() => GeoPoint.fromObject(object as any)).toThrowError(TypeError);
  });
});