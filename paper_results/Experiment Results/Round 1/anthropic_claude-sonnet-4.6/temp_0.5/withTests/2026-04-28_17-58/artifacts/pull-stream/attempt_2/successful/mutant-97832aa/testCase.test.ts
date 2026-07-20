import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull", () => {
  it("should skip null arguments in the pipeline without throwing a TypeError", () => {
    // Original: `s && typeof s === 'object'` → false for null (null is falsy, skipped safely)
    // Mutated:  `s || typeof s === 'object'` → `null || true` = true for null,
    //           causing `s.sink(read)` to throw TypeError: Cannot read property 'sink' of null
    const source = function(abort: any, cb: any) {
      if (abort) return cb(abort);
      cb(null, 1);
    };

    expect(() => {
      pull(source, null as any);
    }).not.toThrow();
  });
});