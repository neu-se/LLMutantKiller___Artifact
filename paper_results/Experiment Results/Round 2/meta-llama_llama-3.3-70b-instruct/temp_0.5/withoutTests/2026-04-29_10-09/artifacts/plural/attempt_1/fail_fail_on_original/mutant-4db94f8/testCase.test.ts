import { plural } from '../../../../../../../../subject_repositories/plural/index.js';

describe('plural function', () => {
  it('should handle string rules correctly', () => {
    expect(plural('criterion', 2)).toBe('criteria');
    expect(plural('bacterium', 2)).toBe('bacteria');
    expect(plural('memo', 2)).toBe('memos');
    expect(plural('cello', 2)).toBe('cellos');
    expect(plural('die', 2)).toBe('dice');
    expect(plural('goose', 2)).toBe('geese');
    expect(plural('mouse', 2)).toBe('mice');
    expect(plural('person', 2)).toBe('people');
    expect(plural('chilli', 2)).toBe('chillies');
  });
});