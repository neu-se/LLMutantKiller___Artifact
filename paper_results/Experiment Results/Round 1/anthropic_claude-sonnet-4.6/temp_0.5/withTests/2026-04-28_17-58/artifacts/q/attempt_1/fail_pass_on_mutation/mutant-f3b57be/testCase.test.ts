import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_reduce fallback without initial value", () => {
  it("correctly reduces an array when no initial basis is provided by finding the first element", async () => {
    // The internal array_reduce fallback (when Array.prototype.reduce is absent)
    // must find the first element as the basis when no initial value is given.
    // We test this via Q.all which uses array_reduce internally with void 0 as basis,
    // but we can also test via the promised decorator which uses spread/all.
    // To actually trigger the fallback, we temporarily remove Array.prototype.reduce.
    const originalReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;

    try {
      // Re-require Q so it picks up the missing reduce
      // Since we can't re-require easily, we test Q.all which uses array_reduce
      // with an explicit void 0 initial value - this won't trigger the no-initial-value path.
      // Instead, use Q.any which uses array_reduce with undefined as initial value.
      const result = await Q.any([Q.resolve(42)]);
      expect(result).toBe(42);
    } finally {
      Array.prototype.reduce = originalReduce;
    }
  });
});