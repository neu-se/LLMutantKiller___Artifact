import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull with null/falsy stream argument", () => {
  it("should skip null arguments without throwing", () => {
    // In the original code, the else if (s && typeof s === 'object') check
    // guards against falsy values. In the mutated code (else if (true)),
    // it would try to call s.sink(read) on null, throwing a TypeError.
    expect(() => {
      const read = pull(
        function(abort: any, cb: any) {
          if (abort) return cb(abort);
          cb(null, 1);
        },
        null as any
      );
      // Call the read function to trigger execution
      read(true, () => {});
    }).not.toThrow();
  });
});