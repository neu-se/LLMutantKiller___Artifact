const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.allSettled", () => {
  it("should resolve with inspection objects for all promises", async () => {
    const fulfilled = Q.resolve(42);
    const rejected = Q.reject(new Error("test"));
    const promises = [fulfilled, rejected];

    const result = await Q.allSettled(promises);

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);
    expect(result[0].state).toBe("fulfilled");
    expect(result[0].value).toBe(42);
    expect(result[1].state).toBe("rejected");
    expect(result[1].reason).toBeInstanceOf(Error);
  });
});