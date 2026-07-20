import { Rule } from '../../../../../../../../../../../subject_repositories/spacl-core/src/rule';

describe('Rule', () => {
  it('should return false when context property does not match path', () => {
    const rule = new Rule('/users/:id');
    const context = { id: '123' };
    const path = '/users/456';
    expect(rule.matches(path, context)).toBe(false);
  });
});