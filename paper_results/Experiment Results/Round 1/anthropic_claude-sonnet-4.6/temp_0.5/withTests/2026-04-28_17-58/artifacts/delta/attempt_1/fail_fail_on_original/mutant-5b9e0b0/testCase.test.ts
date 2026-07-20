import Delta from "../../src/Delta";
import Op from "../../src/Op";

describe('compose() with embed retain on both sides', () => {
  it('should correctly compose two object retains using the retain action', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a as Op[]).compose(new Delta(b as Op[])).ops,
      transform: (a, b, priority) =>
        new Delta(a as Op[]).transform(new Delta(b as Op[]), priority).ops,
      invert: (a, b) => new Delta(a as Op[]).invert(new Delta(b as Op[])).ops,
    });

    try {
      // thisOp has object retain (retain != null), otherOp has object retain
      // The mutation changes action from 'retain' to '', causing newOp[''] = ... instead of newOp.retain = ...
      const a = new Delta().retain({ delta: [{ insert: 'a' }] });
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });

      const result = a.compose(b);

      // With original code: action = 'retain', so newOp.retain = { delta: composed }
      // With mutated code: action = '', so newOp[''] = { delta: composed }, newOp.retain is undefined
      // The result should have a retain op with the composed embed
      const expected = new Delta().retain({
        delta: [{ insert: 'b' }, { insert: 'a' }],
      });

      expect(result).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});