// Test case to detect the mutation in Q.del function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.del mutation test", () => {
  it("should delete the specified property from object", async () => {
    const obj = { prop1: "value1", prop2: "value2", prop3: "value3" };
    const keyToDelete = "prop2";

    // Store original state
    const originalKeys = Object.keys(obj);
    expect(originalKeys).toContain(keyToDelete);

    // Perform delete operation
    await Q(obj).del(keyToDelete);

    // Verify the specific property was deleted
    expect(obj).not.toHaveProperty(keyToDelete);
    expect(obj.prop1).toBe("value1");
    expect(obj.prop3).toBe("value3");

    // This assertion will fail on mutated code where empty array is passed
    // instead of [keyToDelete], because no property will be deleted
    expect(Object.keys(obj)).toEqual(["prop1", "prop3"]);
  });
});