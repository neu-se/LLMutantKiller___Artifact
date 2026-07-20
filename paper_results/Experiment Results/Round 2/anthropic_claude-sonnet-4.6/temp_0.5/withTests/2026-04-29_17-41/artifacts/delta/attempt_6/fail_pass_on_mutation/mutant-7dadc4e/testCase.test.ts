import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('transform retain number vs retain embed object preserves embed in result', () => {
    Delta.registerEmbed('custom', {
      compose: (a: unknown, b: unknown) => ({ ...(a as object), ...(b as object) }),
      transform: (_a: unknown, b: unknown, _priority: boolean) => b,
      invert: (a: unknown, _b: unknown) => a,
    });

    // When thisOp is retain(number) and otherOp is retain(embed object):
    // otherData = embed object (non-null)
    // Original: typeof object === 'object' && object !== null = true => transformedData = otherData
    // Mutated:  typeof object === 'object' && true = true => transformedData = otherData
    // Same - but the embed handler branch checks:
    // typeof thisData === 'object' && thisData !== null => thisData is number => false
    // So no handler called, delta.retain(otherData) directly
    const a = new Delta().retain(1);
    const b = new Delta().retain({ custom: { x: 1 } });

    const result = a.transform(b, false);
    expect(result).toEqual(new Delta().retain({ custom: { x: 1 } }));

    Delta.unregisterEmbed('custom');
  });
});