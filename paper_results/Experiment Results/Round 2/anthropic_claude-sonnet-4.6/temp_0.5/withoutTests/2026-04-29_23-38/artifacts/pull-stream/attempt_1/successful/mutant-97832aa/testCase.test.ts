import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull with null argument", () => {
  it("should handle null through-stream argument without throwing", () => {
    // Create a simple source that produces values
    let ended = false;
    const source = (end: any, cb: Function) => {
      if (end || ended) {
        cb(true);
        return;
      }
      ended = true;
      cb(null, 1);
    };

    // In the original code, null as a through-stream is not a function and
    // null && typeof null === 'object' is false, so it's skipped.
    // In the mutated code, null || typeof null === 'object' evaluates to
    // null || true = true, so it tries s.sink(read) on null and throws TypeError.
    expect(() => {
      // Pass null as a through-stream - original skips it, mutant throws
      const result = pull(source, null as any);
    }).not.toThrow();
  });
});