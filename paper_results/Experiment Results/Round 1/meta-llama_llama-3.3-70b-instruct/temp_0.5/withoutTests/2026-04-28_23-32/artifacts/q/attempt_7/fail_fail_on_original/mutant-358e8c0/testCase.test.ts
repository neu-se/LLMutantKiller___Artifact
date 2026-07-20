import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.all", () => {
  it("should not resolve if one of the promises is pending", () => {
    const promise1 = Q.resolve(1);
    const promise2 = Q.defer().promise;
    const allPromise = Q.all([promise1, promise2]);
    expect(allPromise.inspect().state).toBe("pending");
    promise2.resolve(2);
    return expect(allPromise).resolves.toEqual([1, 2]);
  });

  it("should resolve if all promises are fulfilled", () => {
    const promise1 = Q.resolve(1);
    const promise2 = Q.resolve(2);
    const allPromise = Q.all([promise1, promise2]);
    return expect(allPromise).resolves.toEqual([1, 2]);
  });

  it("should reject if one of the promises is rejected", () => {
    const promise1 = Q.resolve(1);
    const promise2 = Q.reject("error");
    const allPromise = Q.all([promise1, promise2]);
    return expect(allPromise).rejects.toEqual("error");
  });
});