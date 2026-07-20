import { Rule } from '../../../../../../../../../../../subject_repositories/spacl-core/src/rule';

describe('Rule', () => {
  it('should return false when context property is undefined', () => {
    const rule = new Rule('/users/:id');
    const context = {};
    const path = '/users/123';
    expect(rule.matches(path, context)).toBe(false);
  });
});