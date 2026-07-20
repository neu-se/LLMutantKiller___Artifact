import Delta from "../../../../../../../../../../src/Delta";
import Op from "../../../../../../../../../../src/Op";

describe('transform()', () => {
  it('transforms retain with object embed against numeric retain producing numeric retain', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a: Op[], b: Op[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a: Op[], b: Op[], priority: boolean) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });

    const a = new Delta().retain({ delta: [{ insert: 'a' }] });
    const b = new Delta().retain(1, { bold: true });
    const expected = new Delta().retain(1, { bold: true });
    expect(a.transform(b, true)).toEqual(expected);

    Delta.unregisterEmbed('delta');
  });
});