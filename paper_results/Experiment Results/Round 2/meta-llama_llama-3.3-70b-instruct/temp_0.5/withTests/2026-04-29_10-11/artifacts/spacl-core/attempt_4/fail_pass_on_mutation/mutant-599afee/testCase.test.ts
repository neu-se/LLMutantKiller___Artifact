import { Rule } from '../../../../../../../../../../../subject_repositories/spacl-core/src/rule';

describe('Rule', () => {
  it('should match context-dependent paths correctly', () => {
    const rule = Rule.for('/:foo');
    const ctx = { foo: 'bar' };
    const match = '/bar'.match(rule.regex);
    expect(match).not.toBeNull();
    expect(rule.matches('/bar', ctx)).toBe(true);
    expect(rule.regex.props.includes('foo')).toBe(true);
    expect(rule.matches('/bar', ctx)).toBe(true);
    const prop = ctx[rule.regex.props[0]];
    expect(prop).toBe('bar');
  });
});