import { Rule } from "../../../../../../../../../../../subject_repositories/spacl-core/src/rule.ts";

describe('Rule matches with context', () => {
  it('should return false when context property is undefined', () => {
    const rule = new Rule('/:id');
    const result = rule.matches('/123', { id: undefined });
    expect(result).toBe(false);
  });
});