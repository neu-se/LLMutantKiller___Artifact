const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.prototype.keys behavior", () => {
  it("should dispatch keys operation with empty array argument", async () => {
    const obj = { a: 1, b: 2 };
    const promise = Q(obj);
    const dispatchSpy = jest.spyOn(promise, 'dispatch');
    const keys = await promise.keys();
    expect(dispatchSpy).toHaveBeenCalledWith("keys", []);
    expect(keys.sort()).toEqual(["a", "b"]);
  });
});