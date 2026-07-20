import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.get", () => {
  it("should return a promise for the property value", () => {
    const obj = { foo: "bar" };
    return Q.get(obj, "foo").then((value) => {
      expect(value).toBe("bar");
    });
  });
});