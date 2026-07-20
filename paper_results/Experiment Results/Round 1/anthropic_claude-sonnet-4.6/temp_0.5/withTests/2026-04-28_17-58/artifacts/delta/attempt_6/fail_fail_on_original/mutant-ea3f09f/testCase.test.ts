import Delta from "../../../../../../../../../src/Delta";
import Op from "../../../../../../../../../src/Op";

describe('transform()', () => {
  it('does not invoke embed handler when thisData is object but otherData is a number', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a: Op[], b: Op[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a: Op[], b: Op[], priority: boolean) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });

    try {
      const a = new Delta().retain({ delta: [{ insert: 'a' }] });
      const b = new Delta().retain(1);
      const expected = new Delta().retain(1);
      const result = a.transform(b, true);
      expect(result).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});