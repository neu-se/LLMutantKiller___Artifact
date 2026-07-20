// <Jest test file containing exactly one test case>
import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta transform with mixed retain types", () => {
  it("should correctly transform when thisOp has number retain and otherOp has object retain", () => {
    // Register a test embed handler
    Delta.registerEmbed("image", {
      compose: (a: unknown, b: unknown, keepNull: boolean) => b,
      invert: (a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown, priority: boolean) => {
        // Return a transformed value
        return { transformed: true };
      },
    });

    try {
      // this delta: retain 1 (number)
      // other delta: retain { image: { src: "url" } }
      // When thisData is a number and otherData is an object,
      // original: condition fails (typeof thisData !== 'object'), transformedData stays as otherData
      // mutated: enters the block, calls Object.keys(thisData) on a number -> returns [],
      //          embedType = undefined, condition fails, transformedData stays as otherData
      // Both seem the same... need a case where it actually diverges

      // Let's try: thisData is an object embed, otherData is an object embed
      // But also test where thisData is a number to ensure no crash

      // The real divergence: in the mutation, when thisData is NOT an object,
      // Object.keys(thisData) is called. If thisData is a number, it returns [].
      // embedType = undefined, so the inner if (embedType === Object.keys(otherData)[0]) is false.
      // Result: same as original.

      // BUT: what if thisData is undefined? retain can't be undefined in a valid op.
      // What if we have a delete op? No, we skip deletes.

      // The real issue: mutation removes the null check on thisData.
      // If thisData could be null... but retain: null isn't valid.

      // Let me reconsider: the mutation changes the guard from
      // (typeof thisData === 'object' && thisData !== null && otherData !== null)
      // to (true && otherData !== null)
      // 
      // When thisData is a number and otherData is an object:
      // Original: condition is false, skip the block
      // Mutated: condition is true (otherData !== null), enter block
      //   Object.keys(number) returns [] in JS, embedType = undefined
      //   undefined === Object.keys(otherData)[0] -> false
      //   handler block not entered, transformedData stays as otherData
      // Both produce same result!
      //
      // When thisData is an object and otherData is a number:
      // Original: condition is false (otherData !== null is true, but otherData is number not object)
      //   Wait: original condition: typeof thisData === 'object' && thisData !== null && otherData !== null
      //   If otherData is a number (not null), all three conditions could be true!
      //   But then Object.keys(otherData) on a number returns []...
      //
      // Actually let me re-read: transformedData is initialized as:
      //   typeof otherData === 'object' && otherData !== null ? otherData : length
      // So if otherData is a number, transformedData = length (a number)
      // Then in the original, if thisData is object and otherData is number (not null):
      //   condition is true! Object.keys(thisData)[0] gets embedType
      //   Object.keys(otherData) = [] (number), so embedType !== undefined -> false
      //   handler not called, transformedData stays as length
      //
      // Hmm. Let me think about when BOTH are objects (embed retains):
      // Original: enters block, calls handler.transform
      // Mutated: enters block, calls handler.transform
      // Same result.
      //
      // The mutation would cause a difference when thisData is null:
      // Original: typeof null === 'object' is true, but thisData !== null is false -> skip
      // Mutated: true && otherData !== null -> enter block
      //   Object.keys(null) -> TypeError!
      //
      // Can thisData be null? thisData = thisOp.retain
      // retain can be: number | Record<string, unknown>
      // But what if someone constructs a Delta with retain: null?

      const thisDelta = new Delta([{ retain: null as any }]);
      const otherDelta = new Delta([{ retain: { image: { src: "url" } } }]);

      // Original: typeof null === 'object' && null !== null -> false, skip block, no error
      // Mutated: true && otherData !== null -> enter block, Object.keys(null) -> TypeError!
      
      expect(() => {
        thisDelta.transform(otherDelta, false);
      }).not.toThrow();

      const result = thisDelta.transform(otherDelta, false);
      // The result should retain the embed
      expect(result.ops).toEqual([{ retain: { image: { src: "url" } } }]);
    } finally {
      Delta.unregisterEmbed("image");
    }
  });
});