import { plural } from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural', () => {
  it('should return the correct plural form for words that end with "quy"', () => {
    expect(plural('soliloquy')).toBe('soliloquies');
    expect(plural('soliloquy', 1)).toBe('soliloquy');
  });
});