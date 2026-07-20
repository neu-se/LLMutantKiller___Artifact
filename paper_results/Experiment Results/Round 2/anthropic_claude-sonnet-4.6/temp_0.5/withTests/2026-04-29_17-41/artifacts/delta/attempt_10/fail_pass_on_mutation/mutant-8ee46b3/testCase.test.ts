import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('transform of object retain against object retain with embed handler', () => {
    Delta.registerEmbed('image', {
      compose: (_a: unknown, b: unknown) => b,
      invert: (_a: unknown, b: unknown) => b,
      transform: (_a: unknown, b: unknown, _priority: boolean) => b,
    });

    // Both thisOp and otherOp are object retains
    // otherData IS an object -> ternary takes ? branch -> transformedData = otherData
    // mutation doesn't affect this path, handler.transform is called
    // Result should have retain with image embed
    const a = new Delta().retain({ image: 'a.png' });
    const b = new Delta().retain({ image: 'b.png' });
    const result = a.transform(b, true);
    expect(result.ops.length).toBe(1);
    expect(result.ops[0].retain).toEqual({ image: 'b.png' });

    Delta.unregisterEmbed('image');
  });
});