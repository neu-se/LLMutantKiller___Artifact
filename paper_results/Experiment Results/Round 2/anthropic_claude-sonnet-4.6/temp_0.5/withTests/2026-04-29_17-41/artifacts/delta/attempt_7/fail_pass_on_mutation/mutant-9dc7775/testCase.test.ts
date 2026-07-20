import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform()', () => {
  it('transform with getter-based retain', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a, b, priority) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
    });

    try {
      // Create an op with a getter that returns different values
      const op: Op = {};
      let callCount = 0;
      const values = [
        { delta: [{ insert: 'a' }] },  // peekType: non-null → 'retain'
        { delta: [{ insert: 'a' }] },  // peekLength: non-null → 1
        { delta: [{ insert: 'a' }] },  // next() Op.length: non-null → 1
        { delta: [{ insert: 'a' }] },  // next() typeof check: object, not number
        { delta: [{ insert: 'a' }] },  // next() != null check: non-null → true
        { delta: [{ insert: 'a' }] },  // next() assignment: the actual value
      ];
      Object.defineProperty(op, 'retain', {
        get() {
          return values[callCount++ % values.length];
        },
        enumerable: true,
      });
      
      const a = new Delta([op]);
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });
      
      expect(a.transform(b, true)).toEqual(
        new Delta().retain({ delta: [{ retain: 1 }, { insert: 'b' }] })
      );
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});