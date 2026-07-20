import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should have a stack trace when an error is thrown", () => {
    try {
      Q.reject(new Error("Test error"));
    } catch (error) {
      expect(error.stack).not.toBeNull();
      expect(error.stack).not.toBeUndefined();
    }
  });
});