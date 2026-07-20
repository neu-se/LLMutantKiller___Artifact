import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe('GeoPoint', () => {
  it('should throw a RangeError with a meaningful message when creating a GeoPoint with invalid longitude', () => {
    const error = new Error();
    try {
      new GeoPoint(0, 200);
    } catch (e) {
      error = e;
    }
    expect(error.message).not.toBe('');
  });
});