import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts"

describe('Delta compose embed keepNull parameter', () => {
  it('passes keepNull=false when composing an insert embed with a retain embed', () => {
    let capturedKeepNull: boolean | undefined;

    Delta.registerEmbed('image', {
      compose(a: unknown, b: unknown, keepNull: boolean): unknown {
        capturedKeepNull = keepNull;
        return keepNull ? { result: 'keepNull' } : { result: 'noKeepNull' };
      },
      invert(a: unknown, b: unknown): unknown { return {}; },
      transform(a: unknown, b: unknown, priority: boolean): unknown { return {}; },
    });

    const delta1 = new Delta().insert({ image: { url: 'original' } });
    const delta2 = new Delta().retain({ image: { url: 'updated' } });

    const result = delta1.compose(delta2);

    Delta.unregisterEmbed('image');

    expect(capturedKeepNull).toBe(false);
    expect(result.ops[0].insert).toEqual({ image: { result: 'noKeepNull' } });
  });
});