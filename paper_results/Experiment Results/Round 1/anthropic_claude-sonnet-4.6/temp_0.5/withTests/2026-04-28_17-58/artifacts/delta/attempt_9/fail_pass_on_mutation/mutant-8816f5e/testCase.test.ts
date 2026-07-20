import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform()', () => {
  it('transforms insert op against embed retain without throwing', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a: Op[], b: Op[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a: Op[], b: Op[], priority: boolean) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });

    try {
      // a is an insert op, b is an embed retain
      // When priority=false, otherIter.peekType() === 'insert' check doesn't apply
      // thisOp will be the insert, otherOp will be the embed retain
      // thisData = undefined (thisOp.retain is undefined for insert op)
      // otherData = {delta:[{insert:'b'}]} (object)
      // Original: typeof undefined === 'object' = false -> skip -> transformedData = otherData
      // Mutated: false || (true && true) = true -> Object.keys(undefined) -> TypeError!
      const a = new Delta().insert('a');
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });
      const expected = new Delta()
        .retain(1)
        .retain({ delta: [{ insert: 'b' }] });
      expect(a.transform(b, true)).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});