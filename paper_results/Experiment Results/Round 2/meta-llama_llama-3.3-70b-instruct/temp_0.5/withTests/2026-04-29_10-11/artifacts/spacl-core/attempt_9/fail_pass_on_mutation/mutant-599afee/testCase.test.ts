import { Rule } from '../../../../../../../../../../../subject_repositories/spacl-core/src/rule';

describe('Rule', () => {
  it('should match context-dependent paths correctly', () => {
    const rule = Rule.for('/:foo/:bar');
    const ctx = { foo: 'bar', bar: 'baz' };
    expect(rule.matches('/bar/baz', ctx)).toBe(true);
  });
});