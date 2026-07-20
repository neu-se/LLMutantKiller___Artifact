import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.post", () => {
  it("should pass name and args to dispatch correctly", async () => {
    const obj = {
      greet: function (greeting: string, name: string) {
        return `${greeting}, ${name}!`;
      }
    };

    const result = await Q(obj).post("greet", ["Hello", "World"]);
    expect(result).toBe("Hello, World!");
  });
});