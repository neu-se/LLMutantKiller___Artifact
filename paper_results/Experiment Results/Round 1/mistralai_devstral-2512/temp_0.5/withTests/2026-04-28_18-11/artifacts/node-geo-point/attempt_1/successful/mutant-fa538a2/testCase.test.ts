import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint constructor validation', () => {
  it('should throw RangeError with descriptive message for invalid longitude', () => {
    expect(() => {
      new GeoPoint(45, 200);
    }).toThrow('bad longitude value');
  });
});