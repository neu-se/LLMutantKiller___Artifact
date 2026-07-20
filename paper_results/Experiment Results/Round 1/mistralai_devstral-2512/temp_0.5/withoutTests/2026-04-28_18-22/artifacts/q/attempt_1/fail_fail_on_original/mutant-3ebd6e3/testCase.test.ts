import { Q } from "./q";

describe("Q.allSettled", () => {
  it("should resolve with an array of settled promise states", async () => {
    const promises = [
      Q.resolve(42),
      Q.reject(new Error("test error")),
      Q.delay(10, 100)
    ];

    const result = await Q.allSettled(promises);

    expect(result).toBeInstanceOf(Array);
    expect(result).toHaveLength(3);

    // Check first promise (fulfilled)
    expect(result[0]).toHaveProperty("state", "fulfilled");
    expect(result[0]).toHaveProperty("value", 42);

    // Check second promise (rejected)
    expect(result[1]).toHaveProperty("state", "rejected");
    expect(result[1].reason).toBeInstanceOf(Error);
    expect(result[1].reason.message).toBe("test error");

    // Check third promise (fulfilled after delay)
    expect(result[2]).toHaveProperty("state", "fulfilled");
    expect(result[2]).toHaveProperty("value", 10);
  });
});