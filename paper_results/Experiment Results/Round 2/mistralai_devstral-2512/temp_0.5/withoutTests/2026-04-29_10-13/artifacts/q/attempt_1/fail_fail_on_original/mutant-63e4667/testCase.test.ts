import { Q } from "./q.js";

describe("Q.keys() method", () => {
  it("should call dispatch with correct arguments", () => {
    const obj = { a: 1, b: 2, c: 3 };
    const promise = Q(obj);
    const dispatchSpy = jest.spyOn(promise, "dispatch");

    promise.keys();

    expect(dispatchSpy).toHaveBeenCalledWith("keys", []);
    dispatchSpy.mockRestore();
  });
});