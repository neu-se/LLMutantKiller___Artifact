import { Rule, QueryContext } from '../../../../../../../../../../../subject_repositories/spacl-core/src/rule';

describe('Rule', () => {
  it('should correctly match context-dependent paths', () => {
    const rule = new Rule('/:foo');
    const ctx: QueryContext = { foo: 'bar' };
    const match = rule.matches('/bar', ctx);
    expect(match).toBe(true);
  });
});