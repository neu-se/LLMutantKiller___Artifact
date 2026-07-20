import { Rule } from "../../../../../../../../../../../subject_repositories/spacl-core/src/rule";
import { QueryContext } from "../../../../../../../../../../../subject_repositories/spacl-core/src/queryable";

describe('Rule', () => {
  it('should correctly handle context-dependent paths', () => {
    const rule = new Rule('/');
    rule.verbs['verb'] = true;
    const context: QueryContext = { prop: 'value' };
    expect(rule.matches('/', context)).toBe(true);
    expect(rule.matches('/', { prop: 'value' })).toBe(true);
    expect(rule.matches('/', { prop: 'wrongValue' })).toBe(true);
    expect(rule.matches('/', {})).toBe(true);
  });
});