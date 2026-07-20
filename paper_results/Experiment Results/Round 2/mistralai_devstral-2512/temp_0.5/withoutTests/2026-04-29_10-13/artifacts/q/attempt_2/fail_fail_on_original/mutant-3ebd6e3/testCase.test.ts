import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.allSettled", () => {
  it("should resolve with inspection states of all promises", async () => {
    const fulfilledPromise = Q.resolve(42);
    const rejectedPromise = Q.reject(new Error("test error"));

    const result = await Q.allSettled([fulfilledPromise, rejectedPromise]);

    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(2);

    // Check fulfilled promise inspection
    expect(result[0]).toHaveProperty("state", "fulfilled");
    expect(result[0]).toHaveProperty("value", 42);

    // Check rejected promise inspection
    expect(result[1]).toHaveProperty("state", "rejected");
    expect(result[1].reason).toBeInstanceOf(Error);
    expect(result[1].reason.message).toBe("test error");
  });
});