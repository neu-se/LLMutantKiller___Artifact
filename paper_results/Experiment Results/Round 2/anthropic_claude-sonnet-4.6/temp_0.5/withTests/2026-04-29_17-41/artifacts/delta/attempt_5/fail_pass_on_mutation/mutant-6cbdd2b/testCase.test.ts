import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('compose()', () => {
  it('retain start optimization: correctly handles when other starts with object retain', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a: any, b: any) => new Delta(a).compose(new Delta(b)).ops,
      invert: (a: any, b: any) => new Delta(a).invert(new Delta(b)).ops,
      transform: (a: any, b: any, priority: boolean) =>
        new Delta(a).transform(new Delta(b), priority).ops,
    });

    try {
      // this: insert('A') insert('B') insert({delta:[{insert:'a'}]})
      // other: retain({delta:[{insert:'b'}]}) retain(2)
      // 
      // Original: block skipped (object retain). Main loop:
      //   - length = min(1, 1) = 1. thisOp = {insert: 'A'}. otherOp = {retain: {delta:[{insert:'b'}]}}.
      //   - This tries to compose 'A' with embed retain → throws "cannot retain a string"
      //
      // Mutated: block entered (true), firstLeft = {delta:[{insert:'b'}]}.
      //   - Loop: 'A' insert has length 1. 1 <= {delta:[{insert:'b'}]} = 1 <= NaN = false.
      //   - Loop doesn't run. NaN > 0 = false. otherIter not advanced.
      //   - Main loop: same as original → throws "cannot retain a string"
      //
      // Both throw. Same behavior.
      
      // Let me use embed inserts in this instead:
      // this: insert({delta:[{insert:'a'}]}) insert({delta:[{insert:'b'}]})
      // other: retain({delta:[{insert:'c'}]}) retain(1)
      
      const a = new Delta()
        .insert({ delta: [{ insert: 'a' }] })
        .insert({ delta: [{ insert: 'b' }] });
      const b = new Delta()
        .retain({ delta: [{ insert: 'c' }] })
        .retain(1);
      
      const result = a.compose(b);
      const expected = new Delta()
        .insert({ delta: [{ insert: 'ca' }] })
        .insert({ delta: [{ insert: 'b' }] });
      
      expect(result).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});