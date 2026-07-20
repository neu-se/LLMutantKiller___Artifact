import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('compose()', () => {
  it('retain start optimization only applies when other starts with a number retain', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a: any, b: any) => new Delta(a).compose(new Delta(b)).ops,
      invert: (a: any, b: any) => new Delta(a).invert(new Delta(b)).ops,
      transform: (a: any, b: any, priority: boolean) =>
        new Delta(a).transform(new Delta(b), priority).ops,
    });

    try {
      // this: insert('A') insert('B') insert('C') retain(5) delete(1)
      // other: retain(3) insert('D')
      // Optimization: A(1), B(1), C(1) all fit within retain(3)
      // firstLeft: 3->2->1->0, then thisIter.peekType()='retain', loop ends
      // otherIter.next(3) consumes retain(3)
      // Main loop: insert('D'), retain(5), delete(1)
      const a = new Delta()
        .insert('A', { bold: true })
        .insert('B')
        .insert('C', { bold: true })
        .retain(5)
        .delete(1);
      const b = new Delta().retain(3).insert('D');
      const expected = new Delta()
        .insert('A', { bold: true })
        .insert('B')
        .insert('C', { bold: true })
        .insert('D')
        .retain(5)
        .delete(1);
      expect(a.compose(b)).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});