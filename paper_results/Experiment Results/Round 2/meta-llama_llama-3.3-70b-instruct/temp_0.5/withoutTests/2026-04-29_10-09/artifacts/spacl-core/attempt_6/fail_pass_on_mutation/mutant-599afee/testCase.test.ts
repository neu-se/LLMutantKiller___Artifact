import { Rule } from "../../../../../../../../../../../subject_repositories/spacl-core/src/rule";
import { QueryContext } from "../../../../../../../../../../../subject_repositories/spacl-core/src/queryable";

describe('Rule', () => {
  it('should correctly handle context-dependent paths', () => {
    const rule = new Rule('/');
    rule.verbs['verb'] = true;
    const context: QueryContext = { };
    expect(rule.matches('/', context)).toBe(true);
    const context2: QueryContext = { prop: 'value' };
    expect(rule.matches('/', context2)).toBe(true);
  });
});