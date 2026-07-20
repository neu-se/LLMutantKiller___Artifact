import { Rule, QueryContext } from '../../../../../../../../../../../subject_repositories/spacl-core/src/rule';

describe('Rule', () => {
  it('should correctly match context-dependent paths with props when prop is defined and matches and another prop is defined but doesn\'t match', () => {
    const rule = new Rule('/:foo/:bar');
    const ctx: QueryContext = { foo: 'foo', bar: 'bar' };
    const match = rule.matches('/foo/bar', ctx);
    expect(match).toBe(true);
    const ctx2: QueryContext = { foo: 'foo', bar: 'baz' };
    const match2 = rule.matches('/foo/bar', ctx2);
    expect(match2).toBe(false);
  });
});