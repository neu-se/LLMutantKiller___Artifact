import { plural } from '../../../../../../../../../../../subject_repositories/plural/index';

describe('plural', () => {
  it('should handle string rules correctly', () => {
    expect(plural('criterion')).toBe('criteria');
    expect(plural('bacterium')).toBe('bacteria');
    expect(plural('memo')).toBe('memos');
    expect(plural('cello')).toBe('cellos');
    expect(plural('die')).toBe('dice');
    expect(plural('goose')).toBe('geese');
    expect(plural('mouse')).toBe('mice');
    expect(plural('person')).toBe('people');
    expect(plural('chilli')).toBe('chillies');
  });
});