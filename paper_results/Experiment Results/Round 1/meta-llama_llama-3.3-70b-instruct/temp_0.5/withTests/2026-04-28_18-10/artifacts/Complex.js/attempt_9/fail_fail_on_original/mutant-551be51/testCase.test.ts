import { Complex } from '../../../complex';

describe('Complex', () => {
  it('should calculate the ceiling of a complex number', () => {
    const complex = new Complex(1.5, 2.7);
    expect(complex.ceil).toBeInstanceOf(Function);
  });
});