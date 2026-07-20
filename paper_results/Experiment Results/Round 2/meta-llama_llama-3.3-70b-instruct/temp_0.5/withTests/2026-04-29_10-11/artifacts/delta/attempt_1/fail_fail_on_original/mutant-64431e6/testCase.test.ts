import { AttributeMap } from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts";

describe('AttributeMap', () => {
  it('diff() should handle mutated code correctly', () => {
    const a: AttributeMap = { key: 'value' };
    const b: AttributeMap = { key: 'value' };
    const result = AttributeMap.diff(a, b);
    expect(result).toBeUndefined();
  });
});