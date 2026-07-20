import { Complex } from './complex.js';

describe('Complex', () => {
  it('should have im property initialized when created with undefined input', () => {
    const complex = new Complex();
    expect(Object.keys(complex)).toContain('im');
  });
});