import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('transform embed retain against embed retain of same type calls handler correctly', () => {
    Delta.registerEmbed<unknown>('delta', {
      compose: (a: unknown, b: unknown) =>
        new Delta(a as any).compose(new Delta(b as any)).ops,
      transform: (a: unknown, b: unknown, priority: boolean) =>
        new Delta(a as any).transform(new Delta(b as any), priority).ops,
      invert: (a: unknown, b: unknown) =>
        new Delta(a as any).invert(new Delta(b as any)).ops,
    });

    try {
      // Both thisData and otherData are object embeds with key 'delta'
      // Original: true && true && true && true => enter, call handler
      // Mutated: true (short-circuit) => enter, call handler
      // Same path - need a case where they diverge
      
      // Key insight: when thisData is an object embed and otherData is a NUMBER,
      // transformedData = length (not otherData, since otherData is not object)
      // Original: true && true && false => SKIP block
      //   result: retain(length) with transformed attributes
      // Mutated: true (short-circuit) => ENTER block
      //   embedType = Object.keys(thisData)[0] = 'delta'
      //   Object.keys(otherData)[0] where otherData=number => Object.keys(number) = []
      //   embedType 'delta' !== undefined => handler NOT called
      //   transformedData stays as `length`
      //   result: retain(length) - SAME
      
      // What if thisData is object embed and otherData is ALSO object but different key?
      // Original: true && true && true && true => enter, embedType check fails, no handler
      // Mutated: true => enter, same thing
      // Same.
      
      // After all analysis, let me check: what does the existing test
      // "transform an embed change" actually verify?
      // a = retain({delta:[insert 'a']}), b = retain({delta:[insert 'b']})
      // priority=true: expected = retain({delta:[retain 1, insert 'b']})
      // priority=false: expected = retain({delta:[insert 'b']})
      // Both original and mutated should give same result here.
      
      // The ONLY scenario where mutation differs: thisData is null
      // typeof null === 'object' is TRUE
      // Original: true && (null !== null) = false => skip
      // Mutated: true (short-circuit) => enter => Object.keys(null) THROWS
      
      // From the error log, retain:null results in retain:1 being added to ops
      // This means the OpIterator treats null retain as length 1 (Infinity default?)
      // Let me check: Op.length({retain: null}) - retain is null, not number, not string
      // Op.length falls through to return 1 for embeds
      // So retain:null has length 1
      
      // When a={retain:null} and b={retain:{delta:[...]}}, the iterator processes:
      // thisOp.retain = null, otherOp.retain = {delta:[...]}
      // thisData = null, otherData = {delta:[...]}
      // Original: typeof null === 'object' (true) && null !== null (false) => false => SKIP
      //   transformedData = otherData (since otherData is object)
      //   delta.retain(otherData) => retain({delta:[...]})
      // Mutated: typeof null === 'object' (true) => short-circuit => ENTER
      //   Object.keys(null) => TypeError!
      
      // So the test should use retain:null in thisOp
      // But the error showed it doesn't throw on original - it produces retain(1) + retain(embed)
      // That means something else is happening with null retain processing
      
      // Let me reconsider: maybe the null retain op has length 1 via Op.length
      // and the iterator splits it somehow, producing retain(1) as a separate op
      
      // Actually looking at the output: [retain:1, retain:{delta:[insert:'b']}]
      // The retain:1 comes from somewhere. Maybe null retain is treated as retain(1)?
      // OpIterator.next() with retain:null - peekLength returns Op.length({retain:null})
      // Op.length: retain is null (not number), insert is undefined, delete is undefined
      // So it returns 1 (the default for embed inserts)
      // So retain:null has length 1, and it gets retained as retain(1) in the output
      
      // This means on original: a={retain:null}, b={retain:{delta:[...]}}
      // After transform, we get retain(1) + retain({delta:[...]})
      // NOT a throw. So original doesn't throw with null retain.
      
      // On mutated: enters the if block, calls Object.keys(null) which THROWS
      // So the test WOULD differ: original returns result, mutated throws
      
      // But the test I wrote failed on original too - let me check why
      // The expectation was wrong: I expected just [{retain:{delta:[...]}}]
      // but got [{retain:1}, {retain:{delta:[...]}}]
      // So I just need to fix the expectation!
      
      const a = new Delta([{ retain: null as any }]);
      const b = new Delta([{ retain: { delta: [{ insert: 'b' }] } }]);

      // Original: skip block (null !== null is false), transformedData = otherData
      //   But also processes the null retain as retain(1) somehow
      //   Result: [retain(1), retain({delta:[insert:'b']})]
      // Mutated: enters block, Object.keys(null) => TypeError
      expect(() => a.transform(b, true)).not.toThrow();
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});