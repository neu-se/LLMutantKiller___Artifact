// Test case to detect the mutation in Q.del function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.del mutation test", () => {
  it("should pass the key to the delete operation", async () => {
    const obj = { a: 10, b: 20 };
    const key = "a";

    // Use Q.fcall to wrap the object in a promise
    const result = await Q.fcall(() => obj).del(key);

    // Verify the key was actually deleted from the object
    expect(obj).not.toHaveProperty(key);
    expect(result).toBeUndefined();
  });
});