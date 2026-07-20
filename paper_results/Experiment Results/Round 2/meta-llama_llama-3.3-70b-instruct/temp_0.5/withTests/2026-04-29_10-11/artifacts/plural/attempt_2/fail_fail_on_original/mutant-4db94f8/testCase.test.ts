import { plural } from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural function', () => {
  it('should correctly handle string rules', () => {
    expect(plural('test')).not.toBe('test');
    expect(plural('test')).toBe('tests');
  });
});