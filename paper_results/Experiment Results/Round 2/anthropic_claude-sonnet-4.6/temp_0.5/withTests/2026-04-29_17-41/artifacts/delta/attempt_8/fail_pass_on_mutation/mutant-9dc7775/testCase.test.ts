import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform()', () => {
  it('does not throw when thisData becomes null during iteration', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    try {
      let accessCount = 0;
      const op: any = {};
      Object.defineProperty(op, 'retain', {
        get() {
          accessCount++;
          if (accessCount <= 5) return { delta: [{ insert: 'a' }] };
          return null;
        },
        enumerable: true,
      });
      
      const a = new Delta([op]);
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });
      
      // Original: thisData === null, condition false, skip embed block, no throw
      // Mutant: thisData === null, condition true (null check removed), enter block, Object.keys(null) throws
      expect(() => a.transform(b, true)).not.toThrow();
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});