import { plural } from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural function', () => {
  it('should handle the pluralization of words correctly', () => {
    expect(plural('test', 1)).toBe('test');
    expect(plural('test', 2)).toBe('tests');
  });
});