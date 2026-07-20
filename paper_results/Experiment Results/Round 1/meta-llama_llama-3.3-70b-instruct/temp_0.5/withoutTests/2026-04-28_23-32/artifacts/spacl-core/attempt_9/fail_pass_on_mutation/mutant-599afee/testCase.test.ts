import { Rule } from '../../../../../../../../../../../subject_repositories/spacl-core/src/rule';

describe('Rule', () => {
  it('should return false when context property is defined but does not match path and condition is checked', () => {
    const rule = new Rule('/users/:id');
    const context = { id: '123' };
    const path = '/users/123';
    // Change the context to not match the path
    const context2 = { id: '456' };
    expect(rule.matches(path, context2)).toBe(false);
    // In the mutated code, the condition is always false, so it should return true
    // But in the original code, it should return false
    const rule2 = new Rule('/users/:id');
    const context3 = { id: '123' };
    const path2 = '/users/456';
    expect(rule2.matches(path2, context3)).toBe(false);
  });
});