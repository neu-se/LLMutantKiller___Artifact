// Test case to detect the mutation in Q.del function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.del mutation test", () => {
  it("should fail when delete operation doesn't receive the key", async () => {
    const obj = { a: 10, b: 20 };

    // This test will pass on original code (key is passed)
    // but fail on mutated code (empty array is passed instead of [key])
    await Q(obj).del("a");

    // Verify the property was actually deleted
    expect(obj).not.toHaveProperty("a");
    expect(obj.b).toBe(20);

    // Add a second delete to ensure the mutation is detected
    await Q(obj).del("b");
    expect(obj).not.toHaveProperty("b");
    expect(Object.keys(obj)).toHaveLength(0);
  });
});