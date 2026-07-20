import { Rule } from '../../../../../../../../../../../subject_repositories/spacl-core/src/rule';

describe('Rule', () => {
  it('should return false when context property does not match path and condition is checked', () => {
    const rule = new Rule('/users/:id');
    const context = { id: '123' };
    const path = '/users/456';
    expect(rule.matches(path, context)).toBe(false);
    // In the original code, this should return false
    // But in the mutated code, the condition is always false, so it should return true
    // However, we can't directly test the mutated code here
    // We can only test the original code and make sure it returns false
    // The test will fail on the mutated code because it will return true instead of false
  });
});