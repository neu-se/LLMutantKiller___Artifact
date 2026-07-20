import { Rule } from "../../../../../../../../../../../subject_repositories/spacl-core/src/rule";
import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";
import { QueryContext } from "../../../../../../../../../../../subject_repositories/spacl-core/src/queryable";

describe('Rule', () => {
  it('should correctly handle context-dependent paths', () => {
    const rule = new Rule('path/(prop)');
    const context: QueryContext = { prop: 'value' };
    const matcher = new Matcher('path/(prop)');
    matcher.props = ['prop'];
    rule.regex = matcher;
    rule.verbs['verb'] = true;
    expect(rule.matches('path/value', context)).toBe(true);
    expect(rule.query('path/value', 'verb', context)).toBe(true);
  });
});