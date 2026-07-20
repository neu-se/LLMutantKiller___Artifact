import { Rule, QueryContext } from '../../../../../../../../../../../subject_repositories/spacl-core/src/rule';

describe('Rule', () => {
  it('should correctly match context-dependent paths with props when prop is undefined', () => {
    const rule = new Rule('/:foo/:bar');
    const ctx: QueryContext = { foo: 'foo' };
    const match = rule.matches('/foo/bar', ctx);
    expect(match).toBe(false);
  });
});