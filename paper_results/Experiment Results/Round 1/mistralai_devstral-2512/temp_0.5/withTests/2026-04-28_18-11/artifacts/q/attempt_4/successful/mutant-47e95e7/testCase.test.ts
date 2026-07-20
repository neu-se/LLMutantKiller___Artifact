import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise valueOf behavior", () => {
  it("should return the promise when state is rejected", () => {
    const error = new Error("test");
    const promise = Q.reject(error);
    expect(promise.valueOf()).toBe(promise);
  });
});