import Delta from "../../src/Delta";
import Op from "../../src/Op";

describe('compose() with retain embed on both sides', () => {
  it('composing a retain embed with another retain embed uses retain action correctly', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a as Op[]).compose(new Delta(b as Op[])).ops,
      transform: (a, b, priority) =>
        new Delta(a as Op[]).transform(new Delta(b as Op[]), priority).ops,
      invert: (a, b) => new Delta(a as Op[]).invert(new Delta(b as Op[])).ops,
    });

    try {
      // a has a retain embed (thisOp.retain is an object, not null)
      // b has a retain embed (otherOp.retain is an object)
      // In the compose path: otherOp.retain is object -> goes to else branch
      // thisOp.retain is NOT null -> action should be 'retain' (original)
      // mutation always picks 'insert', causing wrong behavior
      const a = new Delta().retain({ delta: [{ insert: 'a' }] });
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });

      const result = a.compose(b);

      // With original: action='retain', uses thisOp.retain = {delta:[{insert:'a'}]}
      // handler.compose([{insert:'a'}], [{insert:'b'}], true) = new Delta([{insert:'a'}]).compose(new Delta([{insert:'b'}])).ops
      // = [{insert:'b'},{insert:'a'}] -> retain({delta:[{insert:'b'},{insert:'a'}]})
      // With mutation: action='insert', tries thisOp.insert which is undefined -> error or wrong result
      const expected = new Delta().retain({
        delta: [{ insert: 'b' }, { insert: 'a' }],
      });

      expect(result).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});