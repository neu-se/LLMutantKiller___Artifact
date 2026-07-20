import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe("invert() with null retain op", () => {
  it("should not enter embed branch when op.retain is null", () => {
    // Register a handler so we can detect if the embed branch is entered
    let embedHandlerCalled = false;
    Delta.registerEmbed("test", {
      compose: (a: unknown, b: unknown) => b,
      transform: (a: unknown, b: unknown) => b,
      invert: (a: unknown, b: unknown) => {
        embedHandlerCalled = true;
        return b;
      },
    });

    try {
      // Construct a delta with retain: null directly, bypassing the retain() guard
      // typeof null === 'object', so the mutation (removing !== null check) would
      // cause this to enter the embed handler branch
      const delta = new Delta([{ retain: null as any }]);
      const base = new Delta().insert("hello");

      // Original: typeof null === 'object' && null !== null => false => skip branch
      // Mutated:  typeof null === 'object' && true => true => enter branch => throws
      expect(() => delta.invert(base)).not.toThrow();
      expect(embedHandlerCalled).toBe(false);
    } finally {
      Delta.unregisterEmbed("test");
    }
  });
});