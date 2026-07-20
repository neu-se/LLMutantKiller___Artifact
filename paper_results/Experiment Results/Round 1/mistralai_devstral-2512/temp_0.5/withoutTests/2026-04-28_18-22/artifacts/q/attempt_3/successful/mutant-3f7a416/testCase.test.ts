const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.allSettled", () => {
  it("should resolve with an array of inspection objects for all promises", async () => {
    const fulfilledPromise = Q.resolve(42);
    const rejectedPromise = Q.reject(new Error("test error"));
    const promises = [fulfilledPromise, rejectedPromise];

    const result = await Q.allSettled(promises);

    expect(result).toHaveLength(2);
    expect(result[0].state).toBe("fulfilled");
    expect(result[0].value).toBe(42);
    expect(result[1].state).toBe("rejected");
    expect(result[1].reason).toBeInstanceOf(Error);
    expect(result[1].reason.message).toBe("test error");
  });
});