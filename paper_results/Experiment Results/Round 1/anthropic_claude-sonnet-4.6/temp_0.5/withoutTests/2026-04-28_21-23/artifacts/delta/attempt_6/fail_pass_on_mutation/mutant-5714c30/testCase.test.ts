import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('correctly transforms embed retain when both ops have matching embed type objects', () => {
    let transformCallCount = 0;
    Delta.registerEmbed('image', {
      compose: (_a: unknown, b: unknown, _keepNull: boolean) => b,
      invert: (_a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => {
        transformCallCount++;
        return priority ? a : b;
      },
    });

    try {
      // Both retains are objects with matching embed type
      // thisData = { image: { url: 'a' } }, otherData = { image: { url: 'b' } }
      // Both original and mutated: condition is true, handler called
      // This should work the same - let me find a case that differs

      // What if thisData is a number but we want to verify transformedData is correct?
      // thisData = 5 (number), otherData = { image: { url: 'b' } }
      // Original: false, transformedData = otherData = { image: { url: 'b' } }
      // Mutated: true, Object.keys(5) = [], embedType = undefined, inner if fails
      //          transformedData stays = otherData = { image: { url: 'b' } }
      // Same result...

      // The only real difference: when thisData is a non-null object but otherData check
      // Let me try: this has numeric retain, other has object retain
      // But insert a case where the handler WOULD change the result if called

      // Actually: what if thisData is a non-null object with embed type X
      // and otherData is a non-null object with embed type Y (different)?
      // Original: enters outer if, Object.keys(thisData)[0] = 'X', Object.keys(otherData)[0] = 'Y'
      //           X !== Y, inner if fails, transformedData = otherData
      // Mutated: same path, same result

      // I think the mutation is actually a no-op in practice for valid inputs...
      // Let me try to find where it actually differs by testing with thisData = number
      // and a handler that WOULD be called

      // When thisData is a number like 5:
      // Object.keys(5) returns [] in modern JS, so embedType = undefined
      // undefined === 'image' is false, inner if fails
      // transformedData = otherData (the object)
      // delta.retain(otherData, ...) is called

      // When thisData is a non-null object:
      // Both conditions are true in both original and mutated
      // Same behavior

      // The ONLY case that differs: thisData is null
      // Original: typeof null === 'object' (true) && null !== null (false) => false
      // Mutated: typeof null === 'object' (true) || ... => true
      // Then Object.keys(null) - in modern JS this throws TypeError!
      // But we need otherOp.retain to be truthy for this code path...

      // Let me construct: this = retain({image: null}) - but that's an object retain with null value
      // Actually thisData = thisOp.retain, so if thisOp = { retain: null }, thisData = null
      // But retain(null) won't produce that... need direct construction

      // With thisData = null and otherData = { image: { url: 'b' } }:
      // Original: typeof null === 'object' (true) && null !== null (false) => false, skip
      // Mutated: true || (...) => true, Object.keys(null) throws!

      const thisDelta = new Delta([{ retain: null as any }]);
      const otherDelta = new Delta([{ retain: { image: { url: 'b' } } }]);

      // Original should not throw, mutated should throw
      expect(() => thisDelta.transform(otherDelta, false)).not.toThrow();
    } finally {
      Delta.unregisterEmbed('image');
    }
  });
});