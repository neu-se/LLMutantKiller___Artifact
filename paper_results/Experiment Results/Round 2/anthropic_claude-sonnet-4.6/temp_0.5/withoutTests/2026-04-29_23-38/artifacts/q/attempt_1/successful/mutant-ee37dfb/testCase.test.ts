import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.post", () => {
  it("should invoke a method on a fulfilled promise object and return the result", async () => {
    const obj = {
      greet: function (greeting: string) {
        return `${greeting}, world!`;
      }
    };

    const promise = Q(obj);
    const result = await promise.post("greet", ["Hello"]);
    expect(result).toBe("Hello, world!");
  });
});