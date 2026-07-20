import Delta from "../src/Delta";
import Op from "../src/Op";

describe('transform()', () => {
  it('transforms numeric retain against object embed retain preserving the embed', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a: Op[], b: Op[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a: Op[], b: Op[], priority: boolean) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });

    const a = new Delta().retain(1);
    const b = new Delta().retain({ delta: [{ insert: 'b' }] });
    const expected = new Delta().retain({ delta: [{ insert: 'b' }] });
    expect(a.transform(b, true)).toEqual(expected);
    expect(a.transform(b)).toEqual(expected);

    Delta.unregisterEmbed('delta');
  });
});