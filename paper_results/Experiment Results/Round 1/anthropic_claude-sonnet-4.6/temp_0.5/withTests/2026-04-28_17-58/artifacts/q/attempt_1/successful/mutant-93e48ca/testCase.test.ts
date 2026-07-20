import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("post with named method on fulfilled promise", () => {
  it("should invoke the named method on the value, not apply the value itself", async () => {
    const obj = {
      add: function(a: number, b: number) {
        return a + b;
      }
    };

    const result = await Q(obj).post("add", [3, 4]);
    expect(result).toBe(7);
  });
});