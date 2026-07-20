import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('retain() with non-object attributes', () => {
  it('should not add attributes when attributes is a non-object primitive string', () => {
    // When attributes is a non-null non-object value (e.g., a string),
    // the original code checks typeof attributes === 'object' and skips adding attributes.
    // The mutated code replaces that check with `true`, causing attributes to be set incorrectly.
    const delta = new Delta().retain(2, 'bold' as any);
    expect(delta.ops.length).toEqual(1);
    expect(delta.ops[0]).toEqual({ retain: 2 });
    expect((delta.ops[0] as any).attributes).toBeUndefined();
  });
});