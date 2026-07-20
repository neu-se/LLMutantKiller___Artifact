import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.get static method", () => {
  it("should resolve to the property value of the object when using Q.get", async () => {
    const obj = { name: "hello" };
    const result = await Q.get(obj, "name");
    expect(result).toBe("hello");
  });
});