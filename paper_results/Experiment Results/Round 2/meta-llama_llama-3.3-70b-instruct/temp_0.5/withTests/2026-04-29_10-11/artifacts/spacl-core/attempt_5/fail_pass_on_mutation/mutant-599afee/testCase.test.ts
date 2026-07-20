import { Rule } from '../../../../../../../../../../../subject_repositories/spacl-core/src/rule';

describe('Rule', () => {
  it('should match context-dependent paths correctly', () => {
    const rule = Rule.for('/:foo');
    const ctx = { foo: 'bar' };
    const match = '/bar'.match(rule.regex);
    if (match !== null) {
      const prop = ctx[rule.regex.props[0]];
      if (prop !== undefined) {
        expect(match[1]).toBe(prop);
      }
    }
    expect(rule.matches('/bar', ctx)).toBe(true);
  });
});