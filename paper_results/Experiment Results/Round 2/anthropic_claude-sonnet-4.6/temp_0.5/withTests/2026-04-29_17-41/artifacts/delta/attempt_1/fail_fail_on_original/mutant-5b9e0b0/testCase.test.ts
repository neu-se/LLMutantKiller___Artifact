import Delta from "../../src/Delta";
import Op from "../../src/Op";

describe('compose() with embed retain + embed retain', () => {
  it('correctly composes two embed retain operations using the retain action', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a as Op[]).compose(new Delta(b as Op[])).ops,
      transform: (a, b, priority) =>
        new Delta(a as Op[]).transform(new Delta(b as Op[]), priority).ops,
      invert: (a, b) => new Delta(a as Op[]).invert(new Delta(b as Op[])).ops,
    });

    try {
      // thisOp.retain is an object (not null), so action should be 'retain'
      // With mutation, action becomes '' which means newOp[''] is set instead of newOp['retain']
      const a = new Delta().retain({ delta: [{ insert: 'a' }] });
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });

      const result = a.compose(b);

      // The composed result should have a retain with the composed embed
      // With the original code: action = 'retain', so newOp.retain = { delta: [...] }
      // With the mutated code: action = '', so newOp[''] = { delta: [...] } and newOp.retain is undefined
      const expected = new Delta().retain({
        delta: new Delta([{ insert: 'a' }]).compose(new Delta([{ insert: 'b' }])).ops,
      });

      expect(result).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});