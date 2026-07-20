import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.get method behavior", () => {
  it("should correctly dispatch 'get' operation to retrieve property value", () => {
    const testObject = { testKey: "testValue" };
    return Q(testObject).get("testKey").then((result: unknown) => {
      expect(result).toBe("testValue");
    });
  });
});