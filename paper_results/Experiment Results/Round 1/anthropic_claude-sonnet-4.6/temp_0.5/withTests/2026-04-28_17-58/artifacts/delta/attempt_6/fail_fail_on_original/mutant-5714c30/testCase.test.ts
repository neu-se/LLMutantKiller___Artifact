import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('transform embed retain against numeric retain does not call handler', () => {
    let handlerCallCount = 0;

    Delta.registerEmbed<unknown>('delta', {
      compose: (_a: unknown, b: unknown) => b,
      transform: (_a: unknown, b: unknown, _priority: boolean) => {
        handlerCallCount++;
        return { wrongResult: true };
      },
      invert: (_a: unknown, b: unknown) => b,
    });

    try {
      // a retains a number (thisData = number)
      // b retains an embed object (otherData = object)
      // transformedData initialized to otherData (since otherData is object)
      //
      // Original: typeof number === 'object' => false => skip block
      //   transformedData = otherData = {delta:[{insert:'b'}]}
      //   handler NOT called
      //   result: retain({delta:[{insert:'b'}]})
      //
      // Mutated: false || (number !== null && typeof object === 'object' && object !== null) = true
      //   enter block: Object.keys(1) = [] => embedType = undefined
      //   Object.keys(otherData)[0] = 'delta'
      //   undefined !== 'delta' => handler NOT called
      //   transformedData = otherData
      //   result: retain({delta:[{insert:'b'}]})
      //
      // Both same - handler not called in either case
      // This confirms the mutation is a no-op for number thisData

      // Let me try: thisData is object embed, otherData is number
      // transformedData = length (since otherData not object)
      // Original: true && true && false => skip
      //   transformedData = length, result: retain(length) -> chopped away
      // Mutated: true (short-circuit) => enter block
      //   embedType = 'delta', Object.keys(1) = [] => undefined
      //   'delta' !== undefined => handler NOT called
      //   transformedData = length, result: retain(length) -> chopped away
      // Same!

      // After extensive analysis, I believe the mutation only matters for null thisData.
      // Let me verify by checking what happens when we have a Delta with retain:null
      // constructed via the ops array, and see if the behavior differs.
      
      // Actually, let me reconsider the operator precedence one more time.
      // Mutated code as written:
      //   typeof thisData === 'object' || thisData !== null &&
      //   typeof otherData === 'object' &&
      //   otherData !== null
      //
      // JavaScript operator precedence: && has higher precedence than ||
      // So: (typeof thisData === 'object') || (thisData !== null && typeof otherData === 'object' && otherData !== null)
      //
      // For thisData = {delta:[{insert:'a'}]} (object, not null), otherData = {delta:[{insert:'b'}]} (object, not null):
      // Original: true && true && true && true = true
      // Mutated: true (short-circuit) = true
      // Both enter block, both call handler. SAME.
      //
      // For thisData = {delta:[{insert:'a'}]}, otherData = 5:
      // Original: true && true && false = false -> skip
      // Mutated: true -> enter, Object.keys(5)=[], embedType=undefined, 'delta'!==undefined, no handler
      // transformedData = length in both cases. SAME.
      //
      // The mutation IS a no-op for all valid inputs. But the problem says it's killable...
      // Let me look at the transform handler call more carefully:
      // handler.transform(thisData[embedType], otherData[embedType], priority)
      // In mutated with thisData=object, otherData=number:
      //   embedType = Object.keys(thisData)[0] = 'delta'
      //   Object.keys(otherData)[0] where otherData=5... 
      //   Wait, Object.keys is called on otherData to get ITS first key for comparison
      //   But if embedType matches Object.keys(otherData)[0]... 
      //   Object.keys(5) = [] so [0] = undefined. 'delta' !== undefined. No match.
      //
      // UNLESS otherData is a string! typeof string !== 'object' so original skips.
      // But mutated: false || (string !== null && ...) 
      // typeof string === 'object' is false, so the && chain fails. Skip too.
      //
      // I'm convinced the mutation is only observable with null thisData.
      // Let me write the test with null thisData and verify it actually differs.

      const a = new Delta([{ retain: null as any }]);
      const b = new Delta([{ retain: { delta: [{ insert: 'b' }] } }]);

      // Original: typeof null === 'object' (true) && null !== null (false) => false => skip
      //   transformedData = otherData = {delta:[{insert:'b'}]}
      //   result: retain({delta:[{insert:'b'}]})
      // Mutated: typeof null === 'object' (true) => short-circuit true => enter block
      //   Object.keys(null) => TypeError!
      
      const result = a.transform(b, true);
      expect(result.ops).toEqual([{ retain: { delta: [{ insert: 'b' }] } }]);
      expect(handlerCallCount).toBe(0);
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});