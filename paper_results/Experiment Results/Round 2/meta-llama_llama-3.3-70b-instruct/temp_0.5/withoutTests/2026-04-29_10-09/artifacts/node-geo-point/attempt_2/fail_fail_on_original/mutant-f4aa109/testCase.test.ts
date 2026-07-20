import { GeoPoint } from "../../../../../../../../../../../subject_repositories/node-geo-point/src/geo-point";

describe("GeoPoint", () => {
  it("should throw a RangeError with a meaningful message when latitude is out of range", () => {
    const error = new GeoPoint(100, 0);
    expect(() => new GeoPoint(100, 0)).toThrowError(RangeError);
    expect((error as any).message).toBe("bad latitude value");
  });
});