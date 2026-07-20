const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.set() behavior", () => {
  it("should properly set a property on a fulfilled promise's value", async () => {
    const obj = { a: 1 };
    const promise = Q.fulfill(obj);
    await promise.set("b", 2);
    expect((obj as any).b).toBe(2);
  });
});