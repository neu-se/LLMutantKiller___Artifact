import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() with embed handler', () => {
  it('should correctly transform when this has a numeric retain and other has an embed retain', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    try {
      // 'a' retains a number (numeric retain), 'b' retains an embed object
      const a = new Delta().retain(1);
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });
      const expected = new Delta().retain({ delta: [{ insert: 'b' }] });
      // In the original code, thisData (=1, a number) !== null is true but
      // typeof thisData === 'object' check prevents entering embed handler.
      // Wait - let me re-check the condition structure...
      expect(a.transform(b, true)).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});