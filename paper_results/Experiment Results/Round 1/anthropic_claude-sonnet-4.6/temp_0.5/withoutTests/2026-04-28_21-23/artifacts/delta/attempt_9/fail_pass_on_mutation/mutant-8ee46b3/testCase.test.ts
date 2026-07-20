import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta"

describe('Delta transform', () => {
  it('transform where other has object retain and this has number retain, no embed handler match', () => {
    // thisOp.retain = number, otherOp.retain = object
    // otherData = object → original: typeof object === 'object' && !== null → true → otherData
    // mutated: true → otherData
    // Both same. But what if thisData is object and otherData is number?
    // Then embed handler block: typeof thisData === 'object' && typeof otherData === 'object' → false, skip
    // transformedData stays as initial: original=length, mutated=otherData=length. Same.
    
    // The ONLY difference: when otherData is not object AND not equal to length.
    // This seems impossible with valid ops.
    // BUT: what if we have a retain op with object value in 'other', 
    // and 'this' also has object retain, but embed types DON'T match?
    // Then handler block: embedType !== Object.keys(otherData)[0], so no handler call
    // transformedData stays as initial = otherData (object) in both cases. Same.
    
    // Let me try: thisData=object, otherData=object, same embed type, handler transforms
    Delta.registerEmbed('x', {
      compose: (_a: unknown, b: unknown) => b,
      invert: (_a: unknown, b: unknown) => b,
      transform: (_a: unknown, b: unknown, _p: boolean) => ({ result: true }),
    });
    const a = new Delta().retain({ x: { v: 1 } });
    const b = new Delta().retain({ x: { v: 2 } });
    const result = a.transform(b, false);
    Delta.unregisterEmbed('x');
    expect(result.ops).toEqual([{ retain: { x: { result: true } } }]);
  });
});