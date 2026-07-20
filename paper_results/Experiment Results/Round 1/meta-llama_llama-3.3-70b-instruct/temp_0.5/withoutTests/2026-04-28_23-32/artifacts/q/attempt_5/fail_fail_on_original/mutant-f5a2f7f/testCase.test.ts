import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should capture a stack trace when an error is thrown", () => {
    try {
      q.default(function(resolve, reject) {
        throw new Error("Test error");
      })();
    } catch (error) {
      expect(error.stack).toContain("q.js");
    }
  });
});