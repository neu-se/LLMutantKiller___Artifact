import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should have a defined __esModule property with value true', () => {
    expect(Object.getOwnPropertyDescriptor(Complex, '__esModule')).toEqual({ value: true, writable: true, enumerable: false, configurable: true });
  });
});