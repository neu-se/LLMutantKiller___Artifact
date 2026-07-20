import { Rule } from "../../../../../../../../../../../subject_repositories/spacl-core/src/rule.ts";

describe('Rule matches with context', () => {
  it('should return false when context property is undefined', () => {
    const rule = new Rule('/:id');
    const ctx = { id: undefined };
    const result = rule.matches('/test', ctx);
    expect(result).toBe(false);
  });
});