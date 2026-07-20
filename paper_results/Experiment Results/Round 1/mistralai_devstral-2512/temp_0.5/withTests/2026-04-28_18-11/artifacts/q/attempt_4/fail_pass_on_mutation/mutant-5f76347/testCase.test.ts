// Test case to detect the mutation in Q.del function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.del mutation test", () => {
  it("should delete the correct property from object", async () => {
    const obj = { a: 10, b: 20 };
    const key = "a";

    // Create a promise for the object and delete the property
    await Q(obj).del(key);

    // Verify the correct property was deleted
    expect(obj).not.toHaveProperty(key);
    expect(obj).toHaveProperty("b");
    expect(obj.b).toBe(20);
  });
});