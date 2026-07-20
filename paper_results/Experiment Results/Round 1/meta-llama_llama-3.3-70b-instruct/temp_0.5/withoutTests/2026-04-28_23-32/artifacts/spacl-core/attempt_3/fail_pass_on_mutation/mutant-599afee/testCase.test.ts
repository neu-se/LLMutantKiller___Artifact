import { Rule } from '../../../../../../../../../../../subject_repositories/spacl-core/src/rule';

describe('Rule', () => {
  it('should match path with context when prop matches', () => {
    const rule = new Rule('/users/:id');
    const context = { id: '123' };
    const path = '/users/123';
    const originalMatches = rule.matches(path, context);
    expect(originalMatches).toBe(true);
    // Test with a different context
    const context2 = { id: '456' };
    const path2 = '/users/123';
    const originalMatches2 = rule.matches(path2, context2);
    expect(originalMatches2).toBe(false);
  });
});