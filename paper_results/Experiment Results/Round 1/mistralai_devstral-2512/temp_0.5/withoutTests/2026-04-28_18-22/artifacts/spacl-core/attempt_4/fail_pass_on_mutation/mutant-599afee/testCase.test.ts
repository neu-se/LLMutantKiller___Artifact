import { Rule } from "../../../../../../../../../../../subject_repositories/spacl-core/src/rule.ts";

describe('Rule matches with context', () => {
  it('should return false when context property does not match path parameter', () => {
    const rule = new Rule('/:id');
    const result = rule.matches('/123', { id: '456' });
    expect(result).toBe(false);
  });
});