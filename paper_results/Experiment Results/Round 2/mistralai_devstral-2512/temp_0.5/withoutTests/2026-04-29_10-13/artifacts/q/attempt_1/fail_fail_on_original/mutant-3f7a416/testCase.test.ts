import { Q } from "./q.js";

describe("Promise.allSettled", () => {
  it("should resolve with an array of inspection objects for all promises", async () => {
    const fulfilledPromise = Q.resolve(42);
    const rejectedPromise = Q.reject(new Error("test error"));
    const pendingPromise = Q.defer().promise;

    const result = await Q.allSettled([fulfilledPromise, rejectedPromise, pendingPromise]);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(3);

    // Check fulfilled promise
    expect(result[0].state).toBe("fulfilled");
    expect(result[0].value).toBe(42);

    // Check rejected promise
    expect(result[1].state).toBe("rejected");
    expect(result[1].reason).toBeInstanceOf(Error);
    expect(result[1].reason.message).toBe("test error");

    // Check pending promise
    expect(result[2].state).toBe("pending");
  });
});