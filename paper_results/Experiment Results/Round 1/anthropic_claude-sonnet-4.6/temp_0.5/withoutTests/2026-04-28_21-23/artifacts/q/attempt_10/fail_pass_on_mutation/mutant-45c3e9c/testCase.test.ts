import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q uncurryThis mutation", () => {
  it("should correctly slice arguments using array_slice via invoke", async () => {
    // array_slice = uncurryThis(Array.prototype.slice)
    // With mutation: uncurryThis returns undefined, so array_slice is undefined
    // Q.invoke uses array_slice(arguments, 2) - this will throw if array_slice is undefined
    const obj = {
      add: function(a: number, b: number) { return a + b; }
    };
    const result = await Q.invoke(obj, "add", 3, 4);
    expect(result).toBe(7);
  });
});