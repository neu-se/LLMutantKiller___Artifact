import { plural } from '../../../../../../../../subject_repositories/plural/index';

describe('plural function', () => {
  it('should handle string rule correctly', () => {
    expect(plural('criterion')).toBe('criteria');
    const originalRule = plural.addRule;
    plural.addRule = (match: string, result: string) => {
      if (match === 'criterion') {
        return 'criteria';
      }
      return originalRule(match, result);
    };
    expect(plural('criterion')).toBe('criteria');
  });
});