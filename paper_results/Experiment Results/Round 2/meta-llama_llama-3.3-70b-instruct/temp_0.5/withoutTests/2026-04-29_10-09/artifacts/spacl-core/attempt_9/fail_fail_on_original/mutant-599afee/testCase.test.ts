import { Rule } from "../../../../../../../../../../../subject_repositories/spacl-core/src/rule";
import { QueryContext } from "../../../../../../../../../../../subject_repositories/spacl-core/src/queryable";

describe('Rule', () => {
  it('should correctly handle context-dependent paths', () => {
    const rule = new Rule('/(prop)');
    rule.verbs['verb'] = true;
    const context: QueryContext = { prop: 'value' };
    expect(() => new Rule('/(prop)')).not.toThrow();
  });
});