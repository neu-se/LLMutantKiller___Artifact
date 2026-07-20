import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q fulfill post operation with named method", () => {
  it("should call the named method on the value when name is not null or undefined", async () => {
    const obj = {
      greet: function(greeting: string) {
        return `${greeting}, world`;
      }
    };

    const result = await Q(obj).post("greet", ["hello"]);
    expect(result).toBe("hello, world");
  });
});