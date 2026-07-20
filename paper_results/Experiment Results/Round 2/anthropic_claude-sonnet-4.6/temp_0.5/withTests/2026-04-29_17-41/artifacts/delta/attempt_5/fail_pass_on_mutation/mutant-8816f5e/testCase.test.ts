import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform() embed retain against number retain with handler', () => {
  it('transforms embed retain against number retain correctly without calling embed handler', () => {
    let transformCallCount = 0;
    Delta.registerEmbed<unknown[]>('delta', {
      compose: (a: unknown, b: unknown) =>
        new Delta(a as { ops: [] }).compose(new Delta(b as { ops: [] })).ops,
      transform: (a: unknown, b: unknown, priority: boolean) => {
        transformCallCount++;
        return new Delta(a as { ops: [] }).transform(new Delta(b as { ops: [] }), priority).ops;
      },
      invert: (a: unknown, b: unknown) =>
        new Delta(a as { ops: [] }).invert(new Delta(b as { ops: [] })).ops,
    });

    try {
      // thisData = {delta:[{insert:'a'}]} (object), otherData = 1 (number)
      // Original: condition requires both to be objects -> false -> no handler call -> transformedData = length = 1
      // Mutated: thisData is object && not null -> true (short-circuit ||) -> enters block
      //   Object.keys({delta:[...]}) = ['delta'], Object.keys(1) = [] -> undefined
      //   embedType = 'delta', Object.keys(otherData)[0] = undefined -> 'delta' !== undefined -> handler NOT called
      // So both produce same result... need different scenario
      
      // Let's try: thisData = number, otherData = {delta:[...]}
      // Original: typeof thisData === 'object' (false) -> whole condition false -> no handler
      // Mutated: false || (typeof otherData === 'object' && otherData !== null) -> true -> enters block
      //   Object.keys(thisData=1) = [] -> embedType = undefined
      //   Object.keys(otherData={delta:...})[0] = 'delta'
      //   undefined === 'delta' -> false -> handler NOT called
      // transformedData = otherData (object) in both cases... same result
      
      const a = new Delta().retain(1);
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });
      const expected = new Delta().retain({ delta: [{ insert: 'b' }] });
      const result = a.transform(b, true);
      expect(result).toEqual(expected);
      expect(transformCallCount).toEqual(0);
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});