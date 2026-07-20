import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("post with a named method on a fulfilled promise", () => {
  it("should invoke the named method on the value and return its result", async () => {
    const subject = {
      greet: function (name: string) {
        return "Hello, " + name + "!";
      }
    };

    const result = await Q(subject).post("greet", ["World"]);
    expect(result).toBe("Hello, World!");
  });
});