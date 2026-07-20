import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('compose() with retain embed on both sides', () => {
  it('correctly uses retain action when thisOp has a retain embed and otherOp has a retain embed', () => {
    Delta.registerEmbed('delta', {
      compose: (a: unknown, b: unknown) =>
        new Delta(a as Op[]).compose(new Delta(b as Op[])).ops,
      transform: (a: unknown, b: unknown, priority: boolean) =>
        new Delta(a as Op[]).transform(new Delta(b as Op[]), priority).ops,
      invert: (a: unknown, b: unknown) =>
        new Delta(a as Op[]).invert(new Delta(b as Op[])).ops,
    });

    try {
      // a retains a delta embed, b also retains a delta embed
      // In compose: thisOp.retain = {delta:[{insert:'a'}]} (not null)
      // so action should be 'retain' (original), but mutation always uses 'insert'
      // With mutation: thisOp.insert is undefined -> error or wrong result
      const a = new Delta().retain({ delta: [{ insert: 'a' }] });
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });

      const result = a.compose(b);

      // Original: action='retain', handler.compose([{insert:'a'}], [{insert:'b'}], true)
      // = new Delta([{insert:'a'}]).compose(new Delta([{insert:'b'}])).ops
      // = [{insert:'b'},{insert:'a'}]
      const expected = new Delta().retain({
        delta: [{ insert: 'b' }, { insert: 'a' }],
      });

      expect(result).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});