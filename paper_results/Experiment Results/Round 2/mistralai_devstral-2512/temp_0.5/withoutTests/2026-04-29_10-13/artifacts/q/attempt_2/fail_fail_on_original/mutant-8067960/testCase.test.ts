import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.get", () => {
  it("should return a promise that resolves to the property value", async () => {
    const obj = { foo: "bar" };
    const result = await Q.get(obj, "foo");
    expect(result).toBe("bar");
  });
});