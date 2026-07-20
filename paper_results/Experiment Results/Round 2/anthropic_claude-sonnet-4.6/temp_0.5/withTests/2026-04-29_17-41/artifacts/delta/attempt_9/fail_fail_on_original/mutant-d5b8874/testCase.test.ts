import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('compose()', () => {
  it('embed retain op followed by delete - delete should be kept', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    try {
      // a retains an embed object, b deletes it
      // thisOp.retain = { delta: [...] } (non-null object)
      // Both original and mutated: condition true -> delete pushed
      // But what if we have retain-object THEN delete in b?
      const a = new Delta()
        .retain({ delta: [{ insert: 'a' }] })
        .retain(1);
      const b = new Delta().delete(1).retain(1);
      const expected = new Delta().delete(1).retain(1);
      expect(a.compose(b)).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});