import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should set Q.longStackSupport to true when Q_DEBUG is set in the environment", () => {
    const originalEnv = process.env;
    process.env = { ...process.env, Q_DEBUG: 'true' };
    const q = require("../../../../../../../../../../subject_repositories/q/q.js");
    expect(q.longStackSupport).toBe(true);
    process.env = originalEnv;
  });
});