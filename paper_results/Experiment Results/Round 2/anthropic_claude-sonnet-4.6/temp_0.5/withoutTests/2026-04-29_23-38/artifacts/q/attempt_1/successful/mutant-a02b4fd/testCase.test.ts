import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.post with null name", () => {
  it("should call the function directly when name is null", async () => {
    const fn = function(a: number, b: number) {
      return a + b;
    };

    // When name is null, it should apply the function directly (value.apply(void 0, args))
    // In original: if (name === null || name === void 0) -> calls value.apply(void 0, args)
    // In mutated: if (name !== null || name === void 0) -> when name is null, condition becomes
    //   (null !== null) || (null === void 0) = false || false = false
    //   so it falls through to value[name].apply(value, args) which would fail since fn[null] is undefined
    const result = await Q(fn).post(null, [3, 4]);
    expect(result).toBe(7);
  });
});