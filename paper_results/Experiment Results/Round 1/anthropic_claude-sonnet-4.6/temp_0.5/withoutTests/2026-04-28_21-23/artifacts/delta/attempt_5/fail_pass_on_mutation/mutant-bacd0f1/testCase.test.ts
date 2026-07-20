import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta transform', () => {
  it('transform with mismatched embed types keeps otherData as transformedData', () => {
    Delta.registerEmbed('typeA', {
      compose: (_a: unknown, b: unknown) => b,
      invert: (_a: unknown, b: unknown) => b,
      transform: (_a: unknown, b: unknown, _priority: boolean) => b,
    });
    Delta.registerEmbed('typeB', {
      compose: (_a: unknown, b: unknown) => b,
      invert: (_a: unknown, b: unknown) => b,
      transform: (_a: unknown, b: unknown, _priority: boolean) => b,
    });

    const a = new Delta().retain({ typeA: { val: 1 } });
    const b = new Delta().retain({ typeB: { val: 2 } });

    // Both thisData and otherData are objects, not null
    // Original: true && true = true -> transformedData = otherData = {typeB:{val:2}}
    // Mutated:  true || true = true -> transformedData = otherData = {typeB:{val:2}}
    // Embed handler block: embedType='typeA', Object.keys(otherData)[0]='typeB', mismatch -> skip
    // transformedData stays as {typeB:{val:2}}
    // delta.retain({typeB:{val:2}})
    const result = a.transform(b, false);
    expect(result.ops).toEqual([{ retain: { typeB: { val: 2 } } }]);

    Delta.unregisterEmbed('typeA');
    Delta.unregisterEmbed('typeB');
  });
});