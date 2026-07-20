import { GeoPoint } from "../../../src/geo-point";

describe("GeoPoint", () => {
  it("should throw a RangeError with a meaningful message when latitude is out of range", () => {
    expect(() => new GeoPoint(100, 0)).toThrowError(RangeError);
    expect(() => new GeoPoint(100, 0)).toThrowError("bad latitude value");
  });
});