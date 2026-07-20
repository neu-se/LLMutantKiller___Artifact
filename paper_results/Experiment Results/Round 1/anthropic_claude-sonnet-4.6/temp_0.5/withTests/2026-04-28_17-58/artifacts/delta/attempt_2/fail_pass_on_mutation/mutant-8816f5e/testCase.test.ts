import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform()', () => {
  it('does not invoke embed handler when thisData is a number retain and otherData is an embed object retain', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a: Op[], b: Op[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a: Op[], b: Op[], priority: boolean) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });

    try {
      // a has a plain number retain (thisData = 1), b has an embed retain (otherData = object)
      // Original: condition requires BOTH to be objects -> false -> skip handler -> use otherData as-is
      // Mutated: condition becomes true when otherData is object -> tries to call handler with number thisData
      //          Object.keys(1) throws or returns [] causing embedType mismatch error
      const a = new Delta().retain(1);
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });
      const expected = new Delta().retain({ delta: [{ insert: 'b' }] });
      expect(a.transform(b, true)).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});