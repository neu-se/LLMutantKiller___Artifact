import { plural } from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural', () => {
  it('should correctly pluralize words that end with "quy"', () => {
    expect(plural('soliloquy')).toBe('soliloquies');
    expect(plural('soliloquies')).toBe('soliloquies');
    expect(plural('quy')).toBe('quies');
  });
});