// Test case to detect the mutation in Q.del function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.del mutation test", () => {
  it("should delete the specified property from object", async () => {
    const testObj = { prop1: "value1", prop2: "value2" };
    const keyToDelete = "prop1";

    // Store original value to verify deletion
    const originalValue = testObj[keyToDelete];

    // Perform the delete operation
    await Q(testObj).del(keyToDelete);

    // Verify the property was deleted
    expect(testObj).not.toHaveProperty(keyToDelete);
    expect(testObj.prop2).toBe("value2");

    // Verify other properties remain intact
    expect(Object.keys(testObj)).toEqual(["prop2"]);
  });
});