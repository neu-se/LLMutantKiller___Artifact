import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.allSettled", () => {
  it("should return an array of inspection objects for settled promises", async () => {
    const fulfilledPromise = Q.resolve(42);
    const rejectedPromise = Q.reject(new Error("test error"));

    const result = await Q.allSettled([fulfilledPromise, rejectedPromise]);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);
    expect(result[0].state).toBe("fulfilled");
    expect(result[0].value).toBe(42);
    expect(result[1].state).toBe("rejected");
    expect(result[1].reason).toBeInstanceOf(Error);
    expect(result[1].reason.message).toBe("test error");
  });
});