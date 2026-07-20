import { Rule } from "../../../../../../../../../../../subject_repositories/spacl-core/src/rule";
import { QueryContext } from "../../../../../../../../../../../subject_repositories/spacl-core/src/queryable";

describe('Rule', () => {
  it('should correctly handle context-dependent paths', () => {
    const rule = new Rule('/(prop)');
    rule.verbs['verb'] = true;
    const context: QueryContext = { prop: 'value' };
    expect(rule.matches('/value', context)).toBe(true);
    expect(rule.query('/value', 'verb', context)).toBe(true);
    const context2: QueryContext = { prop: 'wrongValue' };
    expect(rule.matches('/value', context2)).toBe(false);
  });
});