import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform()', () => {
  it('transform two object retains of same embed type uses handler correctly', () => {
    let transformCallCount = 0;
    let transformArgs: [unknown, unknown, boolean][] = [];
    
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a: Op[], b: Op[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a: Op[], b: Op[], priority: boolean) => {
        transformCallCount++;
        transformArgs.push([a, b, priority]);
        return new Delta(a).transform(new Delta(b), priority).ops;
      },
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });

    try {
      // Both thisData and otherData are objects of same embed type
      // Original condition: true && true && true && true => true, calls handler
      // Mutated condition: true || (...) => true, also calls handler
      // BUT: with a numeric thisData and object otherData:
      // thisData = 3 (number from retain(3)), otherData = { delta: [...] }
      // Original: false && ... => false, transformedData stays as otherData
      // Mutated: false || (3 !== null && true && true) => true
      //   embedType = Object.keys(3)[0] = undefined
      //   undefined === 'delta' => false, so handler NOT called
      //   transformedData stays as otherData
      // Still same result!
      
      // The REAL difference: when thisData is an object retain and otherData is numeric
      // thisData = { delta: [...] }, otherData = 3 (number)
      // typeof otherData === 'object' is false => condition is false in both cases
      // Same result!
      
      // What about thisData = { delta: [...] } (object), otherData = { delta: [...] } (object)?
      // Original: true && true && true && true => true
      // Mutated: true || (...) => true
      // Same!
      
      // I need to find a case where original=false but mutated=true WITH observable difference
      // Only possibility: typeof thisData === 'object' is TRUE but thisData !== null is FALSE
      // i.e., thisData IS null
      // But null retain can't come from normal OpIterator...
      // Unless: what about retain: { someEmbed: value } where the iterator splits it?
      // OpIterator.next(length) for object retain always returns the whole object (length=1)
      
      // Let me check: what does OpIterator return for retain: { delta: ops }?
      // It returns { retain: { delta: ops } } as-is since length of embed = 1
      // So thisData = { delta: ops }, never null
      
      // CONCLUSION: The mutation may not be detectable through normal API usage
      // But let me try with priority=false for two object retains of same type
      // to see if the OUTPUT differs
      
      const a = new Delta().retain({ delta: [{ insert: 'a' }] });
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });
      
      const resultTrue = a.transform(b, true);
      const resultFalse = a.transform(b, false);
      
      // With priority=false, handler.transform(aData, bData, false) should return bData transformed by aData without priority
      // Expected: retain with transformed delta
      expect(resultTrue).toEqual(new Delta().retain({ delta: [{ retain: 1 }, { insert: 'b' }] }));
      expect(resultFalse).toEqual(new Delta().retain({ delta: [{ insert: 'b' }] }));
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});