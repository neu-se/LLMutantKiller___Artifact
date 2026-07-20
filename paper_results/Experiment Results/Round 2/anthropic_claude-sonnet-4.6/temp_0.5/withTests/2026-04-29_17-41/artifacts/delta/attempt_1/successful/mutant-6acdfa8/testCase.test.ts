import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('retain() with non-object attributes', () => {
  it('should not set attributes when attributes is a non-null non-object value', () => {
    // When attributes is a string (non-object), the original code checks typeof attributes === 'object'
    // which is false, so attributes should NOT be set on the op.
    // The mutated code replaces this check with `true`, causing Object.keys to be called on a string,
    // which would set attributes = "bold" on the op.
    const delta = new Delta().retain(2, 'bold' as any);
    expect(delta.ops.length).toEqual(1);
    expect(delta.ops[0]).toEqual({ retain: 2 });
    expect(delta.ops[0].attributes).toBeUndefined();
  });
});