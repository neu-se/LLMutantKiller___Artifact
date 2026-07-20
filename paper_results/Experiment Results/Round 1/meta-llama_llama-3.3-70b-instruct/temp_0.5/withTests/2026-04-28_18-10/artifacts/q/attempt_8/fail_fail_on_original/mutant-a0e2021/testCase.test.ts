import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should set Q.longStackSupport to true when Q_DEBUG is set in the environment", () => {
    process.env.Q_DEBUG = 'true';
    expect(q.longStackSupport).toBe(true);
    delete process.env.Q_DEBUG;
  });
});