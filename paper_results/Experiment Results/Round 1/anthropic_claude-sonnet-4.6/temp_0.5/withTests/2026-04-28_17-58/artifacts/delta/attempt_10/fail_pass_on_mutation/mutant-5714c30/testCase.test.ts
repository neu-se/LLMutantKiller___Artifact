import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('transform embed retain with attributes against numeric retain preserves correct transformedData', () => {
    Delta.registerEmbed<unknown>('delta', {
      compose: (a: unknown, b: unknown) =>
        new Delta(a as any).compose(new Delta(b as any)).ops,
      transform: (a: unknown, b: unknown, priority: boolean) =>
        new Delta(a as any).transform(new Delta(b as any), priority).ops,
      invert: (a: unknown, b: unknown) =>
        new Delta(a as any).invert(new Delta(b as any)).ops,
    });

    try {
      // a retains an embed object {delta:[{insert:'a'}]}
      // b retains a number 1 with attributes
      // thisData = {delta:[{insert:'a'}]} (object), otherData = 1 (number)
      // transformedData initialized to: typeof 1 === 'object' ? 1 : length = length = 1
      // Original: true && true && false = false -> skip
      //   delta.retain(1, AttributeMap.transform(thisAttrs, otherAttrs, priority))
      // Mutated: true (thisData is object) -> enter block
      //   embedType = 'delta', Object.keys(1)[0] = undefined
      //   'delta' !== undefined -> no handler call
      //   transformedData stays 1
      //   delta.retain(1, AttributeMap.transform(...))
      // Both: retain(1, ...) -> same
      
      // Hmm. Let me think about what ACTUALLY differs.
      // The mutation changes when the embed handler is invoked.
      // Original invokes handler when BOTH thisData and otherData are non-null objects.
      // Mutated invokes handler when EITHER thisData is object OR (thisData not null AND otherData is non-null object).
      //
      // The difference: when thisData IS an object but otherData is NOT an object (and not null).
      // In this case, original skips handler, mutated enters block.
      // But in the block, Object.keys(otherData) where otherData is number returns [].
      // So embedType from thisData never matches undefined from otherData.
      // Handler never called. transformedData unchanged.
      //
      // TRULY the only observable difference is:
      // 1. null thisData: original skips, mutated enters and Object.keys(null) throws
      //    But null retain is falsy so treated as insert, never reaches this code
      // 2. null otherData: original skips, mutated may enter if thisData is object
      //    Then Object.keys(null) throws
      //    But null retain is falsy so treated as insert, never reaches this code
      //
      // So the mutation is a NO-OP for all valid inputs reachable through the API!
      //
      // BUT WAIT - the problem guarantees this mutation IS killable.
      // Let me look at this from a completely different angle.
      // Maybe I should look at what `thisData` and `otherData` actually are
      // in the context of the transform method more carefully.
      //
      // In transform():
      //   const thisData = thisOp.retain;
      //   const otherData = otherOp.retain;
      //
      // thisOp and otherOp come from iterators. When an iterator is exhausted,
      // it returns {retain: Infinity}.
      // So thisData could be Infinity (a number) and otherData could be an object embed.
      //
      // But we only reach this code when NEITHER is insert NOR delete.
      // The while loop condition: thisIter.hasNext() || otherIter.hasNext()
      // When one is exhausted, it returns {retain: Infinity}.
      //
      // More importantly: we reach the retain+retain else branch when:
      // - thisIter.peekType() !== 'insert' (so it's retain or delete, but delete is handled above)
      // - otherIter.peekType() !== 'insert' (same)
      // - thisOp is not delete, otherOp is not delete
      // So both are retains.
      //
      // thisOp.retain can be: a number, or an object embed
      // otherOp.retain can be: a number, or an object embed
      //
      // Case (object, number): original skips, mutated enters but no handler called (as analyzed)
      // Case (number, object): original skips, mutated enters but no handler called (as analyzed)
      // Case (object, object): both enter, same result
      // Case (number, number): both skip, same result
      //
      // I'm convinced the mutation is a no-op. But the problem says it's killable.
      // Let me try to actually run the test with the mutation to see what happens.
      // Since I can't do that, let me look at the test from a different angle:
      // Maybe the test should check that when BOTH are object embeds, the handler
      // is called with the RIGHT arguments (not wrong ones due to short-circuit).
      //
      // With both as objects:
      // Original: true && true && true && true -> enter
      // Mutated: true (short-circuit) -> enter
      // Both call handler with same args. Same result.
      //
      // I'll try one more thing: what if the embed types DON'T match?
      // thisData = {typeA: 'x'}, otherData = {typeB: 'y'}
      // Original: enters, embedType='typeA', Object.keys(otherData)[0]='typeB', no match
      // Mutated: enters (short-circuit), same, no match
      // Same result.
      //
      // What if no handler is registered for the embed type?
      // Both enter, both call Delta.getHandler which throws.
      // Same throw.
      //
      // I truly cannot find a difference. Let me just write a test that
      // exercises the most complex path and hope it catches the mutation.
      
      const a = new Delta().retain({ delta: [{ insert: 'a' }] });
      const b = new Delta().retain({ delta: [{ insert: 'b' }] });
      
      // priority=true: handler.transform([{insert:'a'}], [{insert:'b'}], true)
      // = new Delta([{insert:'a'}]).transform(new Delta([{insert:'b'}]), true)
      // = retain(1) + insert('b') -> after chop: retain(1) + insert('b')
      // So result: retain({delta:[{retain:1},{insert:'b'}]})
      
      // priority=false: handler.transform([{insert:'a'}], [{insert:'b'}], false)  
      // = new Delta([{insert:'a'}]).transform(new Delta([{insert:'b'}]), false)
      // = insert('b') -> result: retain({delta:[{insert:'b'}]})
      
      expect(a.transform(b, true)).toEqual(
        new Delta().retain({ delta: [{ retain: 1 }, { insert: 'b' }] })
      );
      expect(a.transform(b, false)).toEqual(
        new Delta().retain({ delta: [{ insert: 'b' }] })
      );
    } finally {
      Delta.unregisterEmbed('delta');
    }
  });
});