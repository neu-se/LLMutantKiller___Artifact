import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("post method on fulfilled promise", () => {
  it("should invoke the named method and return its result", async () => {
    const subject = {
      add: function(a: number, b: number) {
        return a + b;
      }
    };

    const result = await Q(subject).post("add", [3, 4]);
    expect(result).toBe(7);
  });
});