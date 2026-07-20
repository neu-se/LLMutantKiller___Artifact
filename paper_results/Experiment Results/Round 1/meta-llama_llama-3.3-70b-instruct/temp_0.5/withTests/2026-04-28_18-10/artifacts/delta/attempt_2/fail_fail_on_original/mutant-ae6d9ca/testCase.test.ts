import { AttributeMap } from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts";

describe('AttributeMap', () => {
  it('diff function handles non-object input correctly', () => {
    const a = 'non-object';
    const b = { key: 'value' };
    const result = AttributeMap.diff(a, b);
    expect(result).toEqual(b);
  });
});