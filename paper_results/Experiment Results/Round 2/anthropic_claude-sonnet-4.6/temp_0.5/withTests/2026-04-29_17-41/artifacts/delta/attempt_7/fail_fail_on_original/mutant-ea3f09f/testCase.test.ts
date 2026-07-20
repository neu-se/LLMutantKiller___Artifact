import Delta from "../../src/Delta";
import Op from "../../src/Op";

describe('transform()', () => {
  it('does not call embed transform handler when this retain is an embed but other retain is a number', () => {
    const transformFn = jest.fn((a: Op[], b: Op[], priority: boolean) =>
      new Delta(a).transform(new Delta(b), priority).ops
    );

    Delta.registerEmbed<Op[]>('delta', {
      compose: (a: Op[], b: Op[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: transformFn,
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });

    try {
      const a = new Delta().retain({ delta: [{ insert: 'a' }] });
      const b = new Delta().retain(1, { bold: true });

      const result = a.transform(b, true);

      expect(transformFn).not.toHaveBeenCalled();
      expect(result).toEqual(new Delta().retain(1, { bold: true }));
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});