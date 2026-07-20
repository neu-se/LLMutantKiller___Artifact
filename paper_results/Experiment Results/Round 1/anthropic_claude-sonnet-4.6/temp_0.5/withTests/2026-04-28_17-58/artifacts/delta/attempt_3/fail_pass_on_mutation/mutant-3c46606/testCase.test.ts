import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() embed with registered handler', () => {
  it('should apply handler transform to embed data when both ops retain the same embed type', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a: Op[], b: Op[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a: Op[], b: Op[], priority: boolean) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });

    try {
      const a = new Delta().retain({ delta: [{ insert: 'a' }] });
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });

      // With priority=false, a transforms b: since a has no priority,
      // b's ops should remain as-is (not shifted)
      const result = a.transform(b, false);

      // The handler.transform is called with priority=false
      // new Delta([{insert:'a'}]).transform(new Delta([{insert:'b'}]), false)
      // = new Delta().insert('b') (no retain prepended since no priority)
      const expected = new Delta().retain({
        delta: [{ insert: 'b' }],
      });

      expect(result).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});