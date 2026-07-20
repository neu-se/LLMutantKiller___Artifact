import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('compose()', () => {
  it('should not apply retain start optimization when first retain is an object embed retain', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a: any, b: any) => new Delta(a).compose(new Delta(b)).ops,
      invert: (a: any, b: any) => new Delta(a).invert(new Delta(b)).ops,
      transform: (a: any, b: any, priority: boolean) =>
        new Delta(a).transform(new Delta(b), priority).ops,
    });

    try {
      // 'a' has a string insert followed by an embed insert
      // 'b' starts with an object (embed) retain
      // Original: typeof firstOther.retain === 'number' is FALSE, so optimization block is skipped
      // Mutated:  true && ... enters the block, firstLeft = object retain,
      //           arithmetic (object - 0) = NaN, causing otherIter.next(NaN) to be called,
      //           which consumes the embed retain op, so it won't be processed in the main loop
      const a = new Delta()
        .insert('hello')
        .insert({ delta: [{ insert: 'a' }] });

      const b = new Delta()
        .retain(5)
        .retain({ delta: [{ insert: 'b' }] });

      const result = a.compose(b);

      // Expected: string inserts are retained (5 chars), embed gets composed
      const expected = new Delta()
        .insert('hello')
        .insert({ delta: [{ insert: 'ba' }] });

      expect(result).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});