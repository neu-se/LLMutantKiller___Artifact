import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.all", () => {
  it("should handle fulfilled and pending promises correctly", () => {
    const promise1 = Q.resolve(1);
    const promise2 = Q.defer().promise;
    const allPromise = Q.all([promise1, promise2]);
    expect(allPromise.inspect().state).toBe("pending");
    promise2.resolve(2);
    return allPromise.then((values) => {
      expect(values).toEqual([1, 2]);
    });
  });
});