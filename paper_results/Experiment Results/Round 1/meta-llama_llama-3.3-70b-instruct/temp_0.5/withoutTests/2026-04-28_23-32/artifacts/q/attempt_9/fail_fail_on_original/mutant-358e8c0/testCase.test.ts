import { Q } from "../../../q.js";

describe("Q.all", () => {
  it("should resolve with the correct values when all promises are fulfilled", () => {
    const promise1 = Q.resolve(1);
    const promise2 = Q.resolve(2);
    const allPromise = Q.all([promise1, promise2]);
    return expect(allPromise).resolves.toEqual([1, 2]);
  });

  it("should reject with the correct error when one of the promises is rejected", () => {
    const promise1 = Q.resolve(1);
    const promise2 = Q.reject("error");
    const allPromise = Q.all([promise1, promise2]);
    return expect(allPromise).rejects.toEqual("error");
  });

  it("should not resolve if one of the promises is pending and then fulfilled", () => {
    const promise1 = Q.resolve(1);
    const promise2 = Q.defer().promise;
    const allPromise = Q.all([promise1, promise2]);
    expect(allPromise.inspect().state).toBe("pending");
    promise2.resolve(2);
    return expect(allPromise).resolves.toEqual([1, 2]);
  });

  it("should resolve immediately if all promises are already fulfilled", () => {
    const promise1 = Q.resolve(1);
    const promise2 = Q.resolve(2);
    const allPromise = Q.all([promise1, promise2]);
    expect(allPromise.inspect().state).toBe("fulfilled");
    return expect(allPromise).resolves.toEqual([1, 2]);
  });
});