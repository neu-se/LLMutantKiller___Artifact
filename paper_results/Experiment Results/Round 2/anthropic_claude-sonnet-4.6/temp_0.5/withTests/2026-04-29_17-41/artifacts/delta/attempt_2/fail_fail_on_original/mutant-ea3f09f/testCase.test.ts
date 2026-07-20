import Delta from "../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() embed handler with number retain', () => {
  it('does not invoke embed handler when this retain is an embed object but other retain is a number', () => {
    const transformFn = jest.fn((a: Op[], b: Op[], priority: boolean) =>
      new Delta(a).transform(new Delta(b), priority).ops
    );

    Delta.registerEmbed<Op[]>('delta', {
      compose: (a: Op[], b: Op[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: transformFn,
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });

    try {
      // thisData is an embed object {delta: [...]}, otherData is a number (1)
      // The embed handler should NOT be called because otherData is not an object
      const a = new Delta().retain({ delta: [{ insert: 'a' }] });
      const b = new Delta().retain(1, { bold: true });

      const result = a.transform(b, true);

      // The embed transform handler should not have been called
      expect(transformFn).not.toHaveBeenCalled();

      // The result should preserve the number retain with its attributes
      expect(result).toEqual(new Delta().retain(1, { bold: true }));
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});