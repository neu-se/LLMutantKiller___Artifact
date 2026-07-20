import { Rule } from "../../../../../../../../../../../subject_repositories/spacl-core/src/rule.ts";

describe('Rule matches with context', () => {
  it('should return true when context property matches path parameter and is defined', () => {
    const rule = new Rule('/:id');
    const result = rule.matches('/123', { id: '123' });
    expect(result).toBe(true);
  });
});