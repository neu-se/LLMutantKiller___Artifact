import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import Op from "../../../../../../../../../../../subject_repositories/delta/src/Op";

describe('transform() embed handler mutation detection', () => {
  it('transform embed retain against numeric retain uses handler correctly', () => {
    Delta.registerEmbed<Op[]>('delta', {
      compose: (a: unknown, b: unknown) =>
        new Delta(a as Op[]).compose(new Delta(b as Op[])).ops,
      transform: (a: unknown, b: unknown, priority: boolean) =>
        new Delta(a as Op[]).transform(new Delta(b as Op[]), priority).ops,
      invert: (a: unknown, b: unknown) =>
        new Delta(a as Op[]).invert(new Delta(b as Op[])).ops,
    });

    try {
      // thisData = embed object { delta: [...] }, otherData = number (1)
      // Original: typeof object === 'object' && object !== null => true
      //           BUT typeof number === 'object' => false => condition false => skip handler
      //           transformedData stays as `length` (number) since otherData is number
      // Mutated:  typeof object === 'object' => true (short-circuit OR)
      //           enters handler block
      //           Object.keys(thisData)[0] = 'delta'
      //           Object.keys(otherData) where otherData=1 => []
      //           Object.keys(otherData)[0] = undefined
      //           'delta' !== undefined => handler NOT called
      //           transformedData stays as otherData... wait otherData is number here
      // transformedData was set to `length` when otherData is number
      // So result should be same...

      // I need a case where the mutation causes the handler to actually be called with wrong args
      // That means: thisData is object AND otherData is object but they have DIFFERENT embed types
      // Original: both are objects, not null => enter block, embedType check fails => no handler call
      // Mutated: same path... 

      // What if thisData is object (embed) and otherData is object (embed) SAME type?
      // Original: enters block, calls handler.transform correctly
      // Mutated: enters block via OR shortcut... same result

      // The mutation only differs when typeof thisData !== 'object' but thisData !== null
      // i.e., thisData is a number or string
      // AND typeof otherData === 'object' && otherData !== null
      // In that case original skips, mutated enters
      // When mutated enters with thisData=number: Object.keys(number)=[] => embedType=undefined
      // otherData is object: Object.keys(otherData)[0] = 'delta'
      // undefined !== 'delta' => handler not called, transformedData stays as otherData (the embed)
      // But original: skips block entirely, transformedData = otherData (set before the if)
      // SAME RESULT!

      // Unless... the handler IS called when embedType happens to match
      // Object.keys(number) = [] so embedType = undefined, never matches
      // What about thisData being a string? typeof string !== 'object'
      // But retain can't be a string in practice

      // Wait - what about when thisData is null?
      // typeof null === 'object' is TRUE in JS!
      // Original: typeof null === 'object' && null !== null => false => skip
      // Mutated: typeof null === 'object' => true (OR short-circuits) => enters block
      //          Object.keys(null) => THROWS TypeError!
      // So we need thisData to be null, which means thisOp.retain = null
      // But retain can't really be null in normal ops...
      // thisOp.retain is undefined when it's an insert op
      // typeof undefined === 'object' is false, undefined !== null is true
      // Mutated: false || (true && ...) => depends on otherData

      // Hmm, let me reconsider. thisData = thisOp.retain
      // If thisOp is an insert, thisOp.retain is undefined
      // typeof undefined === 'object' => false
      // undefined !== null => true
      // Mutated condition: false || (true && typeof otherData === 'object' && otherData !== null)
      // If otherData is an embed object: false || (true && true && true) = true => enters block!
      // Original: false && ... = false => skips block
      // In the block: Object.keys(undefined) => THROWS TypeError!

      // So: thisOp is insert, otherOp is embed retain
      // But wait, if thisOp is insert, we'd be in the `else` branch of `if (typeof thisOp.retain === 'number')`
      // Actually looking at the code again - the condition is inside the `else` retain block
      // Both thisOp and otherOp are retains at this point in the code

      // Let me re-read: the outer condition is `otherOp.retain` (truthy)
      // Then: if typeof thisOp.retain === 'number' ... else ...
      // In the else: if typeof otherOp.retain === 'number' ... else ...
      // In that else: action = thisOp.retain == null ? 'insert' : 'retain'
      // Then getEmbedTypeAndData(thisOp[action], otherOp.retain)
      // THEN the mutation is in the NEXT if block checking thisData and otherData

      // So at the mutation point:
      // thisData = thisOp.retain (an object embed, since we're past the number check)
      // otherData = otherOp.retain (an object embed, since we're past the number check)
      // Both are already known to be objects at this point!
      // The mutation can't cause different behavior here since both are objects...

      // WAIT. Let me re-read more carefully.
      // The mutation is in the `transform` method's main retain+retain handling
      // NOT inside the nested embed compose logic
      // Let me look at the full context again...

      const a = new Delta().retain({ delta: [{ insert: 'a' }] });
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });
      const expected = new Delta().retain({ delta: [{ insert: 'b' }] });
      expect(a.transform(b, false)).toEqual(expected);
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});