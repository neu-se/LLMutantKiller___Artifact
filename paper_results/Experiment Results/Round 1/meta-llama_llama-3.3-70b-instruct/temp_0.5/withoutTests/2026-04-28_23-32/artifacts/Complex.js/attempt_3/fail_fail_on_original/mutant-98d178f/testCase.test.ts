import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should throw an error when trying to calculate atanh with invalid input', () => {
    const complex = new Complex(1, 2);
    const atanh = complex.atanh();
    expect(() => {
      atanh.toString();
    }).not.toThrow();
    expect(() => {
      new Complex().atanh();
    }).not.toThrow();
    expect(() => {
      new Complex(1).atanh();
    }).not.toThrow();
    expect(() => {
      new Complex(1, 2).atanh();
    }).not.toThrow();
    expect(() => {
      new Complex('1+2i').atanh();
    }).not.toThrow();
    expect(() => {
      new Complex([1, 2]).atanh();
    }).not.toThrow();
    expect(() => {
      new Complex({ re: 1, im: 2 }).atanh();
    }).not.toThrow();
    expect(() => {
      new Complex({ r: 1, phi: 2 }).atanh();
    }).not.toThrow();
    expect(() => {
      new Complex({ abs: 1, arg: 2 }).atanh();
    }).not.toThrow();
    expect(() => {
      new Complex(NaN, NaN).atanh();
    }).toThrow();
  });
});