// Test case to detect the mutation in Q.del function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.del mutation test", () => {
  it("should delete the correct property when key is passed", async () => {
    const obj = { x: 1, y: 2, z: 3 };
    const key = "y";

    // First verify the property exists
    expect(obj).toHaveProperty(key);
    expect(obj[key]).toBe(2);

    // Perform delete operation
    await Q(obj).del(key);

    // Verify the correct property was deleted
    expect(obj).not.toHaveProperty(key);
    expect(obj.x).toBe(1);
    expect(obj.z).toBe(3);

    // Verify the mutation by checking if wrong property would be deleted
    // This will fail on mutated code where empty array is passed instead of [key]
    expect(obj).toHaveProperty("x");
    expect(obj).toHaveProperty("z");
  });
});