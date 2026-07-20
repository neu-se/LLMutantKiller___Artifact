import { Rule, QueryContext } from '../../../../../../../../../../../subject_repositories/spacl-core/src/rule';

describe('Rule', () => {
  it('should correctly match context-dependent paths with props when prop matches', () => {
    const rule = new Rule('/:foo');
    const ctx: QueryContext = { foo: 'bar' };
    const match = rule.matches('/bar', ctx);
    expect(match).toBe(true);
    const ctx2: QueryContext = { foo: 'baz' };
    const match2 = rule.matches('/bar', ctx2);
    expect(match2).toBe(false);
  });
});