import { Complex } from '../../complex.js';

describe('Complex', () => {
  it('should have a sech method that returns a value', () => {
    const complex = new Complex(1, 1);
    const sech = complex.sech();
    expect(sech).toBeTruthy();
  });
});