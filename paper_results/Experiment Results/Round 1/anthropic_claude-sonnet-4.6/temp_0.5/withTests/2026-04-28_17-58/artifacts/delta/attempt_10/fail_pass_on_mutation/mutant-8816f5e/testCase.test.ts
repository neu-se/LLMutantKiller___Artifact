import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform()', () => {
  it('transform embed retain (this) against number retain (other) uses length as transformedData', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a: Op[], b: Op[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a: Op[], b: Op[], priority: boolean) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });

    try {
      // thisData = embed object {delta:[{insert:'a'}]}, otherData = 1 (number)
      // transformedData initialized to: typeof 1 === 'object' ? 1 : length = length = 1
      // Original: false (otherData not object) -> skip -> retain(1)
      // Mutated: (true && true) || false = true -> embedType='delta', Object.keys(1)[0]=undefined
      //   'delta' !== undefined -> no handler call -> retain(1)
      // Both same... need to verify with actual output
      // Add delete to prevent chop
      const a = new Delta([
        { retain: { delta: [{ insert: 'a' }] } },
        { delete: 1 },
      ]);
      const b = new Delta([{ retain: 1 }, { insert: 'x' }]);
      // After transform:
      // thisIter: embed-retain(1), delete(1)
      // otherIter: retain(1), insert('x')
      // Step 1: otherIter.peekType()='retain', thisIter.peekType()='retain' (embed)
      //   length=min(1,1)=1, thisOp={retain:{delta:[...]}}, otherOp={retain:1}
      //   otherOp.retain=1 (truthy), thisOp.retain=embed (object)
      //   newOp.retain = typeof otherOp.retain==='number' ? length : otherOp.retain = 1
      //   delta.retain(1)
      // Step 2: otherIter.peekType()='insert'
      //   delta.push({insert:'x'})
      // Result: retain(1).insert('x')
      const result = a.transform(b, true);
      expect(result).toEqual(new Delta().retain(1).insert('x'));
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});