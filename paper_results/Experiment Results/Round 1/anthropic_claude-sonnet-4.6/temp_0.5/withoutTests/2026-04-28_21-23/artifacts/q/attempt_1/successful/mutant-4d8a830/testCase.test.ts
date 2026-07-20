import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.post with null name", () => {
  it("should call the function directly when name is null (not undefined)", async () => {
    const fn = function (a: number, b: number) {
      return a + b;
    };

    // When name is null, the original code treats it like calling the function directly
    // (value.apply(void 0, args)), while the mutated code would try value[null].apply(value, args)
    const result = await Q(fn).post(null, [3, 4]);
    expect(result).toBe(7);
  });
});