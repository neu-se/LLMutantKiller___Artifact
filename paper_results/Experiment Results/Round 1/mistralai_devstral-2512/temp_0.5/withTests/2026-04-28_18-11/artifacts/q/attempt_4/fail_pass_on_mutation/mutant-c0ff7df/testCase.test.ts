import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.get method", () => {
  it("should correctly dispatch 'get' operation to retrieve object property", () => {
    const testObject = { key: "value" };
    return Q(testObject).get("key").then((result: unknown) => {
      expect(result).toBe("value");
    });
  });
});