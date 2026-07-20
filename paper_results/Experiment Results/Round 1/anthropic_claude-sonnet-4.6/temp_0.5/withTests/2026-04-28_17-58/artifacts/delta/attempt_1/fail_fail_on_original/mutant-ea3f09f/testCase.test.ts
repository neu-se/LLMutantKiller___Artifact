import Delta from "../../src/Delta";
import Op from "../../src/Op";

describe('transform() with embed object vs number retain', () => {
  it('transforms an embed retain against a numeric retain correctly', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    const a = new Delta().retain({ delta: [{ insert: 'a' }] });
    const b = new Delta().retain(1);
    // When 'a' retains an embed object and 'b' retains a number,
    // the transform should pass through b's retain as-is (numeric retain)
    const expected = new Delta().retain(1);
    const result = a.transform(b, true);
    expect(result).toEqual(expected);

    Delta.unregisterEmbed('delta');
  });
});