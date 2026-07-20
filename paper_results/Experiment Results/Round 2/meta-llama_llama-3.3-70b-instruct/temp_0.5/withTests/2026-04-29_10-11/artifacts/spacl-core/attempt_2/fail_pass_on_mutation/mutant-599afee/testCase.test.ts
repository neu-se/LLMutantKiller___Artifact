import { Rule } from '../../../../../../../../../../../subject_repositories/spacl-core/src/rule';

describe('Rule', () => {
  it('should match context-dependent paths correctly', () => {
    const rule = Rule.for('/:foo');
    const ctx = { foo: 'bar' };
    const match = '/bar'.match(rule.regex);
    expect(match).not.toBeNull();
    expect(match[1]).toBe('bar');
    expect(rule.matches('/bar', ctx)).toBe(true);
  });
});