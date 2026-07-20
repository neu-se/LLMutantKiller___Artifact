import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.any", () => {
  it("should return a promise that fulfills with the first resolved value when called on a promise of an array", async () => {
    const promises = [Q.reject(new Error("first")), Q.resolve(42), Q.resolve(100)];
    const promiseOfArray = Q.resolve(promises);
    const result = await promiseOfArray.any();
    expect(result).toBe(42);
  });
});