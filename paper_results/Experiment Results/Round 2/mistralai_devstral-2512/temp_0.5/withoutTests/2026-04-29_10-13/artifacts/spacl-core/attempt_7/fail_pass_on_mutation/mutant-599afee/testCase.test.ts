import { Rule } from "../../../../../../../../../../../subject_repositories/spacl-core/src/rule.ts";

describe('Rule matches with context', () => {
  it('should return true when context property matches path parameter', () => {
    const rule = new Rule('/:id');
    const ctx = { id: '123' };
    const result = rule.matches('/123', ctx);
    expect(result).toBe(true);
  });
});