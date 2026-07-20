import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should set Q.longStackSupport to true when Q_DEBUG is set in the environment and process is an object", () => {
    process.env.Q_DEBUG = 'true';
    if (typeof process === "object" && process.env) {
      expect(q.longStackSupport).toBe(true);
    } else {
      expect(q.longStackSupport).toBe(false);
    }
    delete process.env.Q_DEBUG;
  });
});