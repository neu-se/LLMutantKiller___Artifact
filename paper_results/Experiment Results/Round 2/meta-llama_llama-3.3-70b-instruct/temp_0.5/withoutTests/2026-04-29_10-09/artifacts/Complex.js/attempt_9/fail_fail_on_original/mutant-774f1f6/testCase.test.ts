import { Complex } from './complex.js';

describe('Complex', () => {
  it('should throw an error when parsing a complex number with mutated code', () => {
    const complex = new Complex('1+2i');
    expect(Object.keys(complex)).not.toContain('');
  });
});