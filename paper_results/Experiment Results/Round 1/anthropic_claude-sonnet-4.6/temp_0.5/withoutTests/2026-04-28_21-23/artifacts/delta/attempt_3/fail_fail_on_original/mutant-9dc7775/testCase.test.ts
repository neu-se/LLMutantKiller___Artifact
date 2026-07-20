import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform', () => {
  it('detects mutation by checking behavior when thisData is null with embed otherData', () => {
    Delta.registerEmbed('x', {
      compose: (a: unknown, b: unknown, _: boolean) => b,
      invert: (a: unknown, b: unknown) => a,
      transform: (a: unknown, b: unknown, _: boolean) => ({ mutated: true }),
    });

    const a = new Delta();
    (a as any).ops = [{ retain: null }];
    const b = new Delta().retain({ x: { v: 1 } });

    const result = a.transform(b, false);
    // transformedData should be otherData unchanged (block skipped due to null check)
    expect(result.ops).toEqual([{ retain: { x: { v: 1 } } }]);

    Delta.unregisterEmbed('x');
  });
});