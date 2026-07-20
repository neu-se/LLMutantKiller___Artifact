import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should set Q.longStackSupport to true when Q_DEBUG is set in the environment and process is an object and process.env.Q_DEBUG is truthy", () => {
    process.env.Q_DEBUG = 'true';
    if (typeof process === "object" && process.env && process.env.Q_DEBUG) {
      expect(q.longStackSupport).toBe(true);
    } else {
      expect(q.longStackSupport).toBe(false);
    }
    delete process.env.Q_DEBUG;
  });
});