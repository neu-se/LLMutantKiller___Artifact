import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should return NaN when the floor method is mutated', () => {
    const complex = new Complex(1.5, 2.7);
    const originalFloor = complex.floor;
    complex.floor = function(places) {
      return new Complex(
        Math.floor(this.re * places) / places,
        Math.floor(this[""] * places) / places);
    };
    const floored = complex.floor(0);
    expect(floored.im).toBeNaN();
    complex.floor = originalFloor;
  });
});