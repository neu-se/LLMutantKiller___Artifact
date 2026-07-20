import { plural } from '../../../../../../../../../../../subject_repositories/plural/index';

describe('plural', () => {
  it('should handle string rules correctly', () => {
    plural.addRule('criterion', 'criteria');
    expect(plural('criterion')).toBe('criteria');
    expect(plural('bacterium')).toBe('bacteria');
    expect(plural('cactus')).toBe('cacti');
  });
});