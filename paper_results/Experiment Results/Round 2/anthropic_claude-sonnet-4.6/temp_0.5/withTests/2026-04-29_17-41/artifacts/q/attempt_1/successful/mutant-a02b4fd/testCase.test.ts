import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("fulfill post handler with named method", () => {
  it("should call the named method on the object when name is a non-null string", async () => {
    const subject = {
      add: function (a: number, b: number) {
        return a + b;
      }
    };

    const result = await Q(subject).post("add", [3, 4]);
    expect(result).toBe(7);
  });
});