import AttributeMap from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap";

describe('AttributeMap.compose() with non-object first argument', () => {
  it('should treat a non-object first argument as empty object and not merge its characters', () => {
    // When `a` is not an object (e.g., a string), the original code resets it to {}
    // so no keys from `a` are merged into the result.
    // The mutated code skips `a = {}`, leaving `a` as a string.
    // A for...in loop over a string iterates over its indices ('0', '1', ...).
    // Those indices won't exist in `b`, so they'd be added to attributes,
    // causing the result to differ from the expected { bold: true }.
    const b = { bold: true };
    const result = AttributeMap.compose(
      'hi' as unknown as AttributeMap,
      b,
    );
    expect(result).toEqual({ bold: true });
  });
});