import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong stack accumulation", () => {
  it("should not accumulate duplicate stacks when the same error is re-thrown through promise chains", async () => {
    Q.longStackSupport = true;

    const STACK_JUMP_SEPARATOR = "From previous event:";

    // We need to measure stack separator counts after multiple makeStackTraceLong calls.
    // Build a baseline: single rejection with N hops
    // Then build a two-pass: same structure but error is re-thrown once more
    // 
    // With original: second pass skips the promise that was "top" on first pass
    //   (its counter equals __minimumStackCounter__), so no extra separator added
    // With mutation: second pass includes ALL promises again (undefined is falsy),
    //   adding extra separators

    // Helper to count separators
    function countSeparators(stack: string): number {
      return (stack.match(new RegExp(STACK_JUMP_SEPARATOR, "g")) || []).length;
    }

    // Build a chain with multiple hops, catch error, re-throw multiple times
    // Each re-throw goes through _rejected which calls makeStackTraceLong(error, self)
    // where self is a NEW promise (with higher stackCounter than previous ones)

    // With mutation: each re-throw adds the new promise's stack (since __minimumStackCounter__ stays undefined)
    // With original: each re-throw's promise has counter > __minimumStackCounter__, so condition
    //   error.__minimumStackCounter__ > p.stackCounter is FALSE → skipped

    // So: N re-throws should add N extra separators with mutation, 0 extra with original

    const NUM_RETHROWS = 5;

    // Build chain with rethrows
    const buildChain = async (rethrows: number): Promise<Error | null> => {
      const dStart = Q.defer();
      const dReject = Q.defer();
      let finalError: Error | null = null;

      let chain = dStart.promise.then(function () { return dReject.promise; });

      for (let i = 0; i < rethrows; i++) {
        chain = chain.fail(function (e: Error) { throw e; });
      }

      chain = chain.fail(function (e: Error) { finalError = e; });

      dStart.resolve(undefined);
      dReject.reject(new Error("test"));
      await chain;
      return finalError;
    };

    const errorWith0Rethrows = await buildChain(0);
    const errorWithNRethrows = await buildChain(NUM_RETHROWS);

    expect(errorWith0Rethrows).not.toBeNull();
    expect(errorWithNRethrows).not.toBeNull();

    const count0 = countSeparators(errorWith0Rethrows!.stack || "");
    const countN = countSeparators(errorWithNRethrows!.stack || "");

    // With original: __minimumStackCounter__ is set on first makeStackTraceLong call.
    // Subsequent calls with higher-counter promises skip (condition fails).
    // So countN should equal count0 (no extra separators from rethrows).
    //
    // With mutation: __minimumStackCounter__ is undefined every time,
    // so each rethrow adds the new promise's stack as an extra separator.
    // countN should be count0 + NUM_RETHROWS.
    //
    // We test that countN does NOT grow by NUM_RETHROWS (original behavior).
    expect(countN).toBeLessThan(count0 + NUM_RETHROWS);
  });
});