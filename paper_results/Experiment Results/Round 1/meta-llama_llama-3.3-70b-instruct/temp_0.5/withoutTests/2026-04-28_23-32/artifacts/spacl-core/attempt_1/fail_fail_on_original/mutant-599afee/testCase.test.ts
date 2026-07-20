import { Rule } from '../../rule';

describe('Rule', () => {
  it('should match path with context', () => {
    const rule = new Rule('/users/:id');
    const context = { id: '123' };
    const path = '/users/123';
    expect(rule.matches(path, context)).toBe(true);
  });
});