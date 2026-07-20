import { Rule } from '../../../../../../../../../../../subject_repositories/spacl-core/src/rule';

describe('Rule', () => {
  it('should return false when context property does not match path', () => {
    const rule = new Rule('/users/:id');
    const context = { id: '123' };
    const path = '/users/456';
    expect(rule.matches(path, context)).toBe(false);
    // The mutated code should return true because the condition is always false
    // So we expect the original code to return false and the mutated code to return true
    const ruleMutated = new Rule('/users/:id');
    const contextMutated = { id: '123' };
    const pathMutated = '/users/123';
    expect(ruleMutated.matches(pathMutated, contextMutated)).toBe(true);
    // We are checking if the mutated code returns true when it should return false
    expect(ruleMutated.matches(path, context)).toBe(false);
  });
});