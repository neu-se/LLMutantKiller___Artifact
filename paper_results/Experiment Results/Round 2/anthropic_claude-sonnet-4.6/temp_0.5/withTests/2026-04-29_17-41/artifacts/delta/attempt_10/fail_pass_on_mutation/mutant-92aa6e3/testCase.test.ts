import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('compose()', () => {
  describe('custom embed handler for retain+embed compose', () => {
    beforeEach(() => {
      Delta.registerEmbed<Op[]>('delta', {
        compose: (a, b) => new Delta(a).compose(new Delta(b)).ops,
        transform: (a, b, priority) =>
          new Delta(a).transform(new Delta(b), priority).ops,
        invert: (a, b) => new Delta(a).invert(new Delta(b)).ops,
      });
    });

    afterEach(() => {
      Delta.unregisterEmbed('delta');
    });

    it('composing a retain-embed with another retain-embed uses correct otherData', () => {
      // thisOp is retain-object, otherOp is retain-object
      // action = "" (not 'insert'), so thisOp[""] is undefined... 
      // Actually action should be 'retain' for this path
      const a = new Delta().retain({ delta: [{ insert: 'a' }] });
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });
      // Original: handler.compose([{insert:'a'}], [{insert:'b'}], false)
      //         = new Delta([{insert:'a'}]).compose(new Delta([{insert:'b'}])).ops
      //         = [{insert: 'ba'}]
      // Mutant: handler.compose([{insert:'a'}], true, false)
      //         = new Delta([{insert:'a'}]).compose(new Delta(true)).ops  
      //         = [{insert: 'a'}] (since new Delta(true) has empty ops)
      const expected = new Delta().retain({ delta: [{ insert: 'ba' }] });
      expect(a.compose(b)).toEqual(expected);
    });
  });
});