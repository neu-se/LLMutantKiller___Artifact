const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.set mutation test", () => {
  it("should correctly set multiple properties on a promise", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const promise = Q(obj);

    return promise.set("a", 10)
      .then(() => promise.set("b", 20))
      .then(() => promise.set("c", 30))
      .then(() => {
        expect(obj.a).toBe(10);
        expect(obj.b).toBe(20);
        expect(obj.c).toBe(30);
      });
  });
});