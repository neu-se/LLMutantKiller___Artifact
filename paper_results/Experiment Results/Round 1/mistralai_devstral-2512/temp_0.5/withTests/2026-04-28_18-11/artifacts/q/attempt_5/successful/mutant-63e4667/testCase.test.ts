const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.prototype.keys", () => {
  it("should call dispatch with empty array for keys operation", async () => {
    const obj = { a: 1, b: 2, c: 3 };
    const promise = Q(obj);
    const dispatchSpy = jest.spyOn(promise, 'dispatch');
    const keys = await promise.keys();
    expect(dispatchSpy).toHaveBeenCalledWith("keys", []);
    expect(keys).toEqual(["a", "b", "c"]);
  });
});