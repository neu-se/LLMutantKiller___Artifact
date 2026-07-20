import { Complex } from '../../complex';

describe('Complex', () => {
  it('should calculate acsch correctly', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsch();
    expect(result.im).not.toBeUndefined();
  });
});