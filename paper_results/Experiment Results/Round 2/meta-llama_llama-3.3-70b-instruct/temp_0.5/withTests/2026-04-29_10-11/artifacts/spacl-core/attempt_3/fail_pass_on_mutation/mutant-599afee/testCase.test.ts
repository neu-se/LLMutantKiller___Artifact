import { Rule } from '../../../../../../../../../../../subject_repositories/spacl-core/src/rule';

describe('Rule', () => {
  it('should match context-dependent paths correctly', () => {
    const rule = Rule.for('/:foo');
    const ctx = { foo: 'bar' };
    expect(rule.matches('/bar', ctx)).toBe(true);
    expect(rule.matches('/bar', undefined)).toBe(false);
  });
});