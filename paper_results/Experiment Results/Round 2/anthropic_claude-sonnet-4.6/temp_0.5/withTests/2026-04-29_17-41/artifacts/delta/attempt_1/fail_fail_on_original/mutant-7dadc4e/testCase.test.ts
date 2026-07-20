import Delta from "../../src/Delta";
import Op from "../../src/Op";

describe('transform()', () => {
  it('retain number vs retain embed produces correct transformedData', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a as Op[]).compose(new Delta(b as Op[])).ops,
      transform: (a, b, priority) => new Delta(a as Op[]).transform(new Delta(b as Op[]), priority).ops,
      invert: (a, b) => new Delta(a as Op[]).invert(new Delta(b as Op[])).ops,
    });
    const a = new Delta().retain(1);
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    const expected = new Delta().retain({ delta: [{ insert: 'b' }] });
    const result = a.transform(b, true);
    expect(result).toEqual(expected);
    Delta.unregisterEmbed('delta');
  });
});