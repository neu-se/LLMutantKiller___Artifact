import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform()', () => {
  it('handles null thisData retain with object otherData without throwing', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a: Op[], b: Op[]) => new Delta(a).compose(new Delta(b)).ops,
      transform: (a: Op[], b: Op[], priority: boolean) =>
        new Delta(a).transform(new Delta(b), priority).ops,
      invert: (a: Op[], b: Op[]) => new Delta(a).invert(new Delta(b)).ops,
    });

    try {
      // thisOp.retain will be null-ish - use a delete so thisData ends up not being checked
      // Actually: make thisData = null by having thisOp be a retain of a number
      // and otherOp be a retain of an embed object
      // When thisData is a number, typeof thisData === 'object' is false, so block is skipped in both
      
      // The real case: we need thisData to be null
      // thisOp.retain = null means thisOp has no retain... 
      // Let's try: thisOp is an insert (retain == null), otherOp is retain embed object
      // In transform, when thisOp is insert with priority, we do delta.retain(Op.length)
      // When otherOp is insert, we push it
      // The else branch: both are retain/delete
      // thisData = thisOp.retain, otherData = otherOp.retain
      // If thisOp.retain is undefined (thisOp is a delete), we skip
      // We need thisOp.retain to be an object that is null - not possible directly
      
      // The mutation removes thisData !== null. So if thisData is null object... 
      // retain(null) is not valid. But what about retain({}) where key gives null?
      // Actually the simplest: thisData = some object, otherData = { delta: [...] }
      // In original: handler.transform called. In mutated: same.
      // The REAL difference is when thisData !== null check matters:
      // thisData could be undefined if thisOp has no retain property
      // typeof undefined === 'object' is false, so that's fine.
      
      // Re-reading: original has `thisData !== null` (the `true` placeholder replaces it)
      // So mutated skips the null check on thisData
      // thisData = null when thisOp.retain = null? No, retain(null) returns this without pushing.
      // thisData could be null if... it can't be set to null via public API.
      // Let's construct ops directly:
      const a = new Delta([{ retain: null as any }]);
      const b = new Delta([{ retain: { delta: [{ insert: 'b' }] } }]);
      // Original: typeof null === 'object' is true, but null !== null is false -> skip handler
      // Mutated: typeof null === 'object' is true, true -> enter handler, Object.keys(null) throws!
      expect(() => a.transform(b, true)).not.toThrow();
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});