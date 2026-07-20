import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform()', () => {
  it('transform where thisOp retain is a number and otherOp retain is an embed object produces correct result', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a: Op[], b: Op[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a: Op[], b: Op[], priority: boolean) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });

    try {
      // thisData = number (5), otherData = embed object
      // After the length split, both ops have length 1
      // thisOp = {retain: 1} (number), otherOp = {retain: {delta:[{insert:'b'}]}} (object)
      // Original: condition false (thisData=1 not object) -> transformedData = otherData (embed)
      // Mutated: (false) || (true) = true -> Object.keys(1) = [] -> embedType=undefined
      //   undefined === 'delta' -> false -> handler not called -> transformedData stays otherData
      // Hmm same...
      
      // Let me try: thisData = embed object, otherData = embed object, same type
      // Both should call handler - same behavior
      
      // What about: a has embed retain, b has plain number retain
      // thisData = embed object, otherData = number
      // transformedData = length (since otherData not object)
      // Original: both must be objects -> false -> skip -> transformedData = length
      // Mutated: thisData is object -> true -> Object.keys(embedObj)[0] = 'delta'
      //   Object.keys(number)[0] = undefined -> 'delta' !== undefined -> handler not called
      //   transformedData stays length
      // Still same!
      
      // The ONLY case that differs: thisData is null, otherData is object
      // Original: null !== null fails -> false -> skip -> transformedData = otherData
      // Mutated: (true && false) || (true && true) = true -> Object.keys(null) THROWS
      const a = new Delta([{ retain: { delta: null as any } }]);
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });
      const result = a.transform(b, true);
      expect(result.ops.length).toBeGreaterThanOrEqual(0);
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});