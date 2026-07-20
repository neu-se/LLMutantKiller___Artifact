import { Rule } from '../../../../../../../../../../../subject_repositories/spacl-core/src/rule';

describe('Rule', () => {
  it('should return false when context property is defined but does not match path', () => {
    const rule = new Rule('/users/:id');
    const context = { id: '123' };
    const path = '/users/123';
    // Change the context to not match the path
    const context2 = { id: '456' };
    expect(rule.matches(path, context2)).toBe(false);
  });
});