import * as ComplexModule from '../complex.js';

describe('Complex', () => {
  it('should not have an empty string key', () => {
    expect(Object.keys(ComplexModule)).not.toContain('');
  });
});