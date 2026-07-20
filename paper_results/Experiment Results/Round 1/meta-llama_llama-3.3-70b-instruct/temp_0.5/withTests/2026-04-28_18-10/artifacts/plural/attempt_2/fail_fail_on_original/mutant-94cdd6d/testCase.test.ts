import { plural } from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural function', () => {
  it('should return the singular form when the input number is 1 and the mutated code should fail', () => {
    expect(plural('test', 1)).toBe('test');
    expect(plural('test', undefined)).toBe('tests');
  });
});