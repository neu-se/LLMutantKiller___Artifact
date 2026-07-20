import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts"

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError when passed a string instead of an object', () => {
    expect(() => {
      (GeoPoint as any).fromObject('52.5,13.4');
    }).toThrow(TypeError);
  });
});