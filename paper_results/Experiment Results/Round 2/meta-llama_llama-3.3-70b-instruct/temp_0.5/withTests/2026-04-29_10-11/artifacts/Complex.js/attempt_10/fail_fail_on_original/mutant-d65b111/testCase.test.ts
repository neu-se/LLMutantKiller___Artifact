import { Complex } from '../../../complex';

describe('Complex', () => {
  it('should throw an error when calculating asech for complex numbers with mutation', () => {
    const complex = new Complex(0, 0);
    expect(() => complex.asech()).toThrowError();
  });
});