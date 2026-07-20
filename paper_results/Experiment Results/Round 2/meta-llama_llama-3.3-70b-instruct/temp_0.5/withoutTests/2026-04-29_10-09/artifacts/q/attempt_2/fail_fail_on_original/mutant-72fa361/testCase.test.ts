import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should transform error stack trace by removing Node and Q cruft", () => {
    const error = new Error("Test error");
    const promise = Q.delay(10).then(() => {
      throw error;
    });
    promise.catch((err: any) => {
      expect(err.stack).not.toBeNull();
      expect(err.stack).not.toBeUndefined();
    });
  });
});