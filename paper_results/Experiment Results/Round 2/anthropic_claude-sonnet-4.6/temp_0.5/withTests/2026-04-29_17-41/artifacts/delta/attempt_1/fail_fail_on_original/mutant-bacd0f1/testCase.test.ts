import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() retain + retain with differing lengths', () => {
  it('should use min length when both ops are numeric retains', () => {
    // this retains 1, other retains 3
    // length = min(1, 3) = 1
    // original: transformedData = length = 1
    // mutated: transformedData = otherData = 3 (wrong)
    const a = new Delta().retain(1);
    const b = new Delta().retain(3);
    // After transform, b should become retain(1) followed by retain(2)
    // because a only covers 1 position, so the first chunk is length=1
    // and the remaining retain(2) is untouched
    const expected = new Delta().retain(3);
    const result = a.transform(b, true);
    expect(result).toEqual(expected);
  });
});