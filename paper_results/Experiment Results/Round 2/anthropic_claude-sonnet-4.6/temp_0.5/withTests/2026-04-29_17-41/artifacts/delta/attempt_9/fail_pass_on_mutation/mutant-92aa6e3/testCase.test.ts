import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('compose()', () => {
  describe('custom embed handler', () => {
    beforeEach(() => {
      Delta.registerEmbed<Op[]>('delta', {
        compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
        transform: (a, b, priority) =>
          new Delta(a).transform(new Delta(b), priority).ops,
        invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
      });
    });

    afterEach(() => {
      Delta.unregisterEmbed('delta');
    });

    it('retain an embed with an embed produces correct result', () => {
      const a = new Delta().insert({ delta: [{ insert: 'a' }] });
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });
      const expected = new Delta().insert({
        delta: [{ insert: 'ba' }],
      });
      // Original: otherData = [{ insert: 'b' }], so new Delta([{insert:'b'}]).compose works
      // Mutant:   otherData = true, so new Delta(true) produces empty ops, result differs
      expect(a.compose(b)).toEqual(expected);
    });
  });
});