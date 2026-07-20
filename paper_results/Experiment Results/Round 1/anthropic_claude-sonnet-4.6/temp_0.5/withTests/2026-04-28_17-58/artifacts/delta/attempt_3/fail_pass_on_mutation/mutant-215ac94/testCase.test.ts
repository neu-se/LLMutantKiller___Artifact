import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform()', () => {
  it('transform with numeric retain on this and embed retain on other', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) => new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    // thisOp: retain(1) numeric, otherOp: retain({ delta: [...] }) object
    // Original: typeof 1 === 'object' is false → skip embed block → transformedData = { delta: [...] }
    // Mutated: true && { delta: [...] } !== null → enter block
    //          Object.keys(1) = [] → embedType = undefined
    //          Object.keys({ delta: [...] })[0] = 'delta'
    //          undefined !== 'delta' → skip handler → transformedData = { delta: [...] }
    // Both produce same result... 
    
    // BUT: what if we use a handler that WOULD be called if embed types matched?
    // The issue is embed types can't match when thisData is a number
    
    const a = new Delta().retain(1);
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    const expected = new Delta().retain({ delta: [{ insert: 'b' }] });
    
    const result = a.transform(b, true);
    Delta.unregisterEmbed('delta');
    
    expect(result).toEqual(expected);
  });
});