import { plural } from '../../../../../../../../../../../subject_repositories/plural/index';

describe('plural', () => {
  it('should handle string rules correctly', () => {
    expect(plural('test')).not.toBe('test');
    expect(plural('criterion')).toBe('criteria');
  });
});