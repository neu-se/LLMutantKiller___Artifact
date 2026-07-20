import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("fulfill post operation with named method", () => {
  it("should invoke the named method on the fulfilled value when name is not null", async () => {
    const obj = {
      add: (a: number, b: number) => a + b
    };

    const promise = Q(obj);
    const result = await promise.post("add", [3, 4]);
    
    expect(result).toBe(7);
  });
});