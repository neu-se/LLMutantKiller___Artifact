import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q fulfill post with named method", () => {
  it("should call the named method on the fulfilled value when name is not null/undefined", async () => {
    const obj = {
      greet: function(greeting: string) {
        return `${greeting}, world`;
      }
    };

    const fulfilledPromise = Q(obj);
    const result = await fulfilledPromise.post("greet", ["Hello"]);
    
    expect(result).toBe("Hello, world");
  });
});