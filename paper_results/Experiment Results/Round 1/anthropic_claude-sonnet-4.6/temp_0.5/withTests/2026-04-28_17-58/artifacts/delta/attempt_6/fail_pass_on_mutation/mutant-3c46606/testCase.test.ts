import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() retain numbers with mutation brace shift', () => {
  it('should retain numeric length when both ops are number retains', () => {
    // With plain number retains, the delta.retain() call should still execute.
    // The mutation adds an extra `if(true){` brace which shifts closing braces,
    // potentially causing delta.retain() to not be called for number retains.
    const a = new Delta().retain(3, { bold: true });
    const b = new Delta().retain(3, { italic: true });

    // a transforms b: attributes transform, retain length preserved
    const result = a.transform(b, true);

    // Should produce a retain with transformed attributes
    const expected = new Delta().retain(3, { italic: true });
    expect(result).toEqual(expected);
  });
});