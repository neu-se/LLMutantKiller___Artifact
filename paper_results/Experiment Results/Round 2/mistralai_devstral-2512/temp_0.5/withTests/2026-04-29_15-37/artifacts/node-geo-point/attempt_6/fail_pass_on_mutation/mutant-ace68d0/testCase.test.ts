import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint validation', () => {
  it('should throw TypeError when fromObject receives a number input', () => {
    expect(() => {
      GeoPoint.fromObject(123 as any);
    }).toThrow(TypeError);
  });
});