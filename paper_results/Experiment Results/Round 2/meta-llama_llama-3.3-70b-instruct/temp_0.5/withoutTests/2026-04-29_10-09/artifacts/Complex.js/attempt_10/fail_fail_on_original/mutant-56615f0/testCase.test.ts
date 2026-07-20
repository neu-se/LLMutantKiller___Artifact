import { Complex } from './complex';

describe('Complex', () => {
  it('should have an acsch method', () => {
    const complex = new Complex(1, 0);
    expect(complex).toHaveProperty('acsch');
  });
});