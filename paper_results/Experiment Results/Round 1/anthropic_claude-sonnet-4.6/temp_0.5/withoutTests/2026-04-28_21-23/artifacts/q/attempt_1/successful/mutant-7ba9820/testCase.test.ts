import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.ninvoke", () => {
  it("should invoke a named method on the promise value and return a promise with the result", async () => {
    const obj = {
      greet: function (name: string, callback: (err: null, result: string) => void) {
        callback(null, "Hello, " + name + "!");
      }
    };

    const result = await Q(obj).ninvoke("greet", "World");
    expect(result).toBe("Hello, World!");
  });
});