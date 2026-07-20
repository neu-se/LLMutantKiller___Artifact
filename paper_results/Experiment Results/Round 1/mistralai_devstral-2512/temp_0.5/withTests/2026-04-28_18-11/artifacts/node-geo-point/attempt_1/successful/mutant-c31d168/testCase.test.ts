import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point.ts";

describe('GeoPoint constructor validation', () => {
  it('should throw RangeError for latitude less than -90', () => {
    expect(() => {
      new GeoPoint(-91, 0);
    }).toThrow(RangeError);
  });
});