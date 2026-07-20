import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.get", () => {
  it("should correctly dispatch the 'get' operation to retrieve a property value", async () => {
    const obj = { foo: "bar" };
    const result = await Q.get(obj, "foo");
    expect(result).toBe("bar");
  });
});