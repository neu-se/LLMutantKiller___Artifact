const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.delete mutation test", () => {
  it("should correctly delete a property using Q.delete", () => {
    const obj = { prop: "value" };
    return Q.delete(obj, "prop").then(() => {
      expect(obj).not.toHaveProperty("prop");
    });
  });
});