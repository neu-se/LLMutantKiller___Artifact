import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise library", () => {
  it("should include the stack trace in the promise when Q.longStackSupport is enabled", () => {
    Q.longStackSupport = true;
    const promise = Q.defer().promise;
    const error = new Error();
    promise.then(() => {
      throw error;
    });
    try {
      Q.done(promise);
    } catch (e) {
      expect(e.stack).toContain("Error");
    }
  });
});