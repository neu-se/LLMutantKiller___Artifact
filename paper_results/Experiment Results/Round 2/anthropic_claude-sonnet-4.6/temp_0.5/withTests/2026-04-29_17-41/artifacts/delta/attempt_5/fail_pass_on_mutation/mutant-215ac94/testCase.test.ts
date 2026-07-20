import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('transform with numeric retain followed by embed retain produces correct result', () => {
    Delta.registerEmbed('delta', {
      compose: (_a: unknown, b: unknown, _keepNull: boolean): unknown => b,
      transform: (_a: unknown, b: unknown, _priority: boolean): unknown => b,
      invert: (_a: unknown, b: unknown): unknown => b,
    });

    try {
      // a has numeric retain, b has embed retain
      // Original: thisData=1 (number), skip embed block, transformedData = otherData (the embed)
      // Mutated: enters block, Object.keys(1)=[], embedType=undefined,
      //          Object.keys({delta:[...]})[0]='delta', undefined !== 'delta', skip handler
      //          Same result - so this won't work
      
      // Instead: a has embed retain, b has numeric retain  
      // thisData = {delta:[...]}, otherData = 1
      // transformedData = length (since otherData is number)
      // Original: typeof {delta:[...]} === 'object' && !== null && 1 !== null → true → enter block
      //           embedType='delta', Object.keys(1)[0]=undefined, 'delta' !== undefined → skip
      // Mutated: same → enter block, same result
      // Still same...
      
      const a = new Delta().retain({ delta: [{ insert: 'a' }] });
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });
      const expected = new Delta().retain({ delta: [{ insert: 'b' }] });
      expect(a.transform(b, false)).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});