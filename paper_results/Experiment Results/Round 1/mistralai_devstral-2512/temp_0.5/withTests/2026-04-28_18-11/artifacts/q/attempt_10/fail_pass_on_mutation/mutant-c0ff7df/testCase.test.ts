import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.get method", () => {
  it("should correctly retrieve property value using get operation", () => {
    const obj = { key: "value" };
    return Q(obj).get("key").then((result: unknown) => {
      expect(result).toBe("value");
    });
  });
});