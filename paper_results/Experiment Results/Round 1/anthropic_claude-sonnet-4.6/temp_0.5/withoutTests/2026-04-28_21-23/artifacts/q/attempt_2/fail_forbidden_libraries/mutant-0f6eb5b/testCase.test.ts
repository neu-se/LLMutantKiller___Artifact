import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";

describe("Q.longStackSupport with Q_DEBUG", () => {
  it("should enable long stack support when Q_DEBUG environment variable is set", async () => {
    process.env.Q_DEBUG = "1";
    // Need to re-require the module with Q_DEBUG set
    const Q = (await import(`../../../../../../../../../../../subject_repositories/q/q.js?bust=${Date.now()}`)).default;
    delete process.env.Q_DEBUG;
    expect(Q.longStackSupport).toBe(true);
  });
});