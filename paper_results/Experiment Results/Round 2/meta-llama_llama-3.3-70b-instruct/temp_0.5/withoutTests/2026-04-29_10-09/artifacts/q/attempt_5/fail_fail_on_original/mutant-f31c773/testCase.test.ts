import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.set", () => {
  it("should dispatch the set operation with the correct arguments", async () => {
    const object = {};
    const key = "testKey";
    const value = "testValue";
    const promise = Q(object).set(key, value);
    await promise;
    expect(object).not.toHaveProperty(key);
  });
});