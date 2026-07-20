import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.get", () => {
  it("should retrieve a property value from a resolved object", async () => {
    const obj = { name: "test", value: 42 };
    const result = await Q.get(obj, "name");
    expect(result).toBe("test");
  });
});