import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint.fromObject validation', () => {
  it('should throw TypeError when input is not an object', () => {
    expect(() => {
      GeoPoint.fromObject(null as any);
    }).toThrow(TypeError);

    expect(() => {
      GeoPoint.fromObject(undefined as any);
    }).toThrow(TypeError);

    expect(() => {
      GeoPoint.fromObject("invalid" as any);
    }).toThrow(TypeError);

    expect(() => {
      GeoPoint.fromObject(123 as any);
    }).toThrow(TypeError);
  });
});