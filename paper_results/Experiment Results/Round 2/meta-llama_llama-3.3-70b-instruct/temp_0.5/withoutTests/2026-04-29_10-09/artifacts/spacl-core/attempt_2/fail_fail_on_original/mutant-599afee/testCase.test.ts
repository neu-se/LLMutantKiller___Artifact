import { Rule } from "../../../../../../../../../../../subject_repositories/spacl-core/src/rule";
import { QueryContext } from "../../../../../../../../../../../subject_repositories/spacl-core/src/queryable";

describe('Rule', () => {
  it('should correctly handle context-dependent paths', () => {
    const rule = new Rule('path/(prop)');
    rule.verbs['verb'] = true;
    const context: QueryContext = { prop: 'value' };
    expect(rule.matches('path/value', context)).toBe(true);
    expect(rule.query('path/value', 'verb', context)).toBe(true);
  });
});