import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint validation', () => {
  it('should throw TypeError when fromObject receives a function', () => {
    expect(() => {
      GeoPoint.fromObject(() => {} as any);
    }).toThrow(TypeError);
  });
});