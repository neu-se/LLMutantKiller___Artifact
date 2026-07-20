import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.mapply dispatches post operation correctly", () => {
  it("should call the named method on the object using mapply", async () => {
    const obj = {
      greet: function(name: string) {
        return "Hello, " + name;
      }
    };

    const result = await Q.mapply(obj, "greet", ["World"]);
    expect(result).toBe("Hello, World");
  });
});