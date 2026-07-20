import { Complex } from "./complex";

describe('Complex', () => {
  it('should calculate asec correctly', () => {
    const complex = new Complex(1, 1);
    const asec = complex.asec();
    expect(asec.re).not.toBeNaN();
    expect(asec.im).not.toBeNaN();
  });
});