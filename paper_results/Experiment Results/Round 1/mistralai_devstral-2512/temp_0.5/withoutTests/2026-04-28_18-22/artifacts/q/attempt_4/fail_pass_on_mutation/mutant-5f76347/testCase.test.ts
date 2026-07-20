const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.delete mutation test", () => {
  it("should correctly delete property from object", async () => {
    const obj = { testKey: "testValue" };
    const promise = Q(obj);

    // Perform the delete operation
    await promise.del("testKey");

    // Verify the property was actually deleted
    const result = await promise.get("testKey");
    expect(result).toBeUndefined();
  });
});