import { Rule } from '../../../../../../../../../../../subject_repositories/spacl-core/src/rule';

describe('Rule', () => {
  it('should return false when context property does not match path and is defined', () => {
    const rule = new Rule('/users/:id');
    const context = { id: '456' };
    const path = '/users/123';
    expect(rule.matches(path, context)).toBe(false);
    const ruleMutated = new Rule('/users/:id');
    const contextMutated = { id: '123' };
    const pathMutated = '/users/123';
    expect(ruleMutated.matches(pathMutated, contextMutated)).toBe(true);
    // In the mutated code, this should not return false, it should return true
    expect(ruleMutated.matches(path, context)).not.toBe(false);
  });
});