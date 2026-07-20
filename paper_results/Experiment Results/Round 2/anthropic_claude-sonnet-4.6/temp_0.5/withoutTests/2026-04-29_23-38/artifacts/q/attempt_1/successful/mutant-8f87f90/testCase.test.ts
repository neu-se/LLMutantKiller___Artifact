import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.post with named method", () => {
  it("should invoke a named method on a fulfilled value", async () => {
    const obj = {
      greet: function (name: string) {
        return "Hello, " + name;
      }
    };

    const result = await Q(obj).post("greet", ["World"]);
    expect(result).toBe("Hello, World");
  });
});