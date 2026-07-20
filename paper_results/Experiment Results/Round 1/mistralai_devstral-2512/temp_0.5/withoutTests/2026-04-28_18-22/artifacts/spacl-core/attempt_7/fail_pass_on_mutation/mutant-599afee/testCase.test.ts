import { Rule } from "../../../../../../../../../../../subject_repositories/spacl-core/src/rule.ts";

describe('Rule matches with context', () => {
  it('should return true when context property matches path parameter and is not undefined', () => {
    const rule = new Rule('/:id');
    const result = rule.matches('/test', { id: 'test' });
    expect(result).toBe(true);
  });
});