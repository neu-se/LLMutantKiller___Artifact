import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() embed type mismatch still retains', () => {
  it('produces empty delta when thisOp deletes and otherOp retains an embed', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a: Op[], b: Op[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a: Op[], b: Op[], priority: boolean) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });

    try {
      // a deletes, b retains an embed object
      // After transform: delete makes the retain redundant -> empty delta
      const a = new Delta().delete(1);
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });

      const result = a.transform(b, true);
      // delete + retain(embed) -> the retain is consumed by the delete
      const expected = new Delta();
      expect(result).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});