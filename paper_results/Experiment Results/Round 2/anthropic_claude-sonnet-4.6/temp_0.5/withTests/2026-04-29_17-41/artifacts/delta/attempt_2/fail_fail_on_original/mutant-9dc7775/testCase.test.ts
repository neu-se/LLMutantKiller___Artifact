import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform()', () => {
  it('does not throw when thisData is null and otherData is an embed object', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    try {
      // Construct a delta with retain:null directly (bypassing builder validation)
      const a = new Delta([{ retain: null as any }]);
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });
      // Original: thisData===null, so null!==null is false, skip embed handler, return embed as-is
      // Mutant: true replaces null check, enters embed handler, Object.keys(null) throws TypeError
      const expected = new Delta().retain({ delta: [{ insert: 'b' }] });
      expect(a.transform(b, true)).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});