import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts";

describe('AttributeMap.diff with non-object a', () => {
  it('returns undefined when a is a non-object (non-array string)', () => {
    const result = AttributeMap.diff('hello' as any, undefined);
    expect(result).toBeUndefined();
  });
});