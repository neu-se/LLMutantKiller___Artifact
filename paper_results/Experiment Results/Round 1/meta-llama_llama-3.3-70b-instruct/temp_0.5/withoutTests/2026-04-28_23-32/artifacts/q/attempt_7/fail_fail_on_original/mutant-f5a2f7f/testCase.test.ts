import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should capture a stack trace when an error is thrown", () => {
    try {
      q.promise((resolve: any, reject: any) => {
        throw new Error("Test error");
      })();
    } catch (error: unknown) {
      expect((error as Error).stack).toContain("q.js");
    }
  });
});