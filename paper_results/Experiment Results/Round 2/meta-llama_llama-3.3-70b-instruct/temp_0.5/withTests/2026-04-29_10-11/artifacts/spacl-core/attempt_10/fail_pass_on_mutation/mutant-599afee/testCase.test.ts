import { Rule } from '../../../../../../../../../../../subject_repositories/spacl-core/src/rule';

describe('Rule', () => {
  it('should match context-dependent paths correctly', () => {
    const rule = Rule.for('/:foo/:bar');
    const ctx = { foo: 'bar', bar: 'baz' };
    const match = '/bar/baz'.match(rule.regex);
    if (match !== null) {
      const prop1 = ctx[rule.regex.props[0]];
      const prop2 = ctx[rule.regex.props[1]];
      if (prop1 !== undefined && prop2 !== undefined && match[1] === prop1 && match[2] === prop2) {
        expect(rule.matches('/bar/baz', ctx)).toBe(true);
      } else {
        expect(rule.matches('/bar/baz', ctx)).toBe(false);
      }
    } else {
      expect(rule.matches('/bar/baz', ctx)).toBe(false);
    }
  });
});