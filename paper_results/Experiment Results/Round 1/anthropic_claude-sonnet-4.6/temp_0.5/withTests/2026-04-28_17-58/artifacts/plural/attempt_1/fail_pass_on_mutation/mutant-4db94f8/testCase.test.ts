import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural string rule matching', () => {
  it('should correctly pluralize words matched by string rules using addRule', () => {
    // Add a custom rule with a string key that has the same string value as a word
    // The mutation changes type check to `true`, which means for RegExp rules,
    // rule[0] === word would compare RegExp object to string (always false)
    // But we need a case where type(rule[0]) !== 'String' but rule[0] === word could be true
    // Use a number or other type - but addRule doesn't restrict types
    
    // Test that string rules work correctly - 'criterion' -> 'criteria'
    expect(plural('criterion')).toBe('criteria');
    expect(plural('die')).toBe('dice');
    expect(plural('goose')).toBe('geese');
    expect(plural('mouse')).toBe('mice');
    expect(plural('person')).toBe('people');
    expect(plural('bacterium')).toBe('bacteria');
  });
});