import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint.fromObject', () => {
  it('should throw TypeError when input is missing latitude property', () => {
    expect(() => {
      GeoPoint.fromObject({ longitude: -122.6 } as any);
    }).toThrow(TypeError);
  });
});