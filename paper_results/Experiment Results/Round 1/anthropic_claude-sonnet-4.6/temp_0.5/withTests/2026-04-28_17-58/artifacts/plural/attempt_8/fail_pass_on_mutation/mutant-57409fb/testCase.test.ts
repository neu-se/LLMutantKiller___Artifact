import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural', () => {
  it('should return the word unchanged when num is 1 for irregular plurals', () => {
    // If num===1, word should be returned as-is regardless of rules
    expect(plural('goose', 1)).toBe('goose');
    expect(plural('mouse', 1)).toBe('mouse');
    expect(plural('person', 1)).toBe('person');
    // And pluralize correctly with no num
    expect(plural('goose')).toBe('geese');
    expect(plural('mouse')).toBe('mice');
    expect(plural('person')).toBe('people');
  });
});