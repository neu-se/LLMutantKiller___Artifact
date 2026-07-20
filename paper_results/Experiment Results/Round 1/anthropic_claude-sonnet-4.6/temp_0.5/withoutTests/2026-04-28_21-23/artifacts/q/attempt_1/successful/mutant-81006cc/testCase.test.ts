import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.mapply", () => {
  it("should invoke the named method on the object with the given arguments", async () => {
    const obj = {
      add: function(a: number, b: number) {
        return a + b;
      }
    };

    const result = await Q.mapply(obj, "add", [3, 4]);
    expect(result).toBe(7);
  });
});