import { Complex } from './complex';

describe('Complex', () => {
  it('should correctly parse a complex number', () => {
    const complex = new Complex('1+2i');
    expect(complex).toHaveProperty('re');
    expect(complex).toHaveProperty('im');
  });
});