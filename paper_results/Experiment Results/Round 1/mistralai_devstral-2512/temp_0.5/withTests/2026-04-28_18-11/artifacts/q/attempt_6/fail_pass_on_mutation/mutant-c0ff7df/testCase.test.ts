import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.get method", () => {
  it("should correctly retrieve property value using get operation", () => {
    const obj = { prop: "testValue" };
    return Q(obj).get("prop").then((value: unknown) => {
      expect(value).toBe("testValue");
    });
  });
});