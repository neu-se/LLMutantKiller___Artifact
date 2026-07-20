import { plural } from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural function', () => {
  it('should return the correct plural form for a word with a count of 1', () => {
    expect(plural('test', 1)).toBe('test');
  });
});