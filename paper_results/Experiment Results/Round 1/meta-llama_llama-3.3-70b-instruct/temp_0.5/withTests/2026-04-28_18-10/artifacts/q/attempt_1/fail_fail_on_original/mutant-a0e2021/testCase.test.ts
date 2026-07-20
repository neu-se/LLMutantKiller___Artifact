import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should enable long stack support when Q_DEBUG is set", () => {
    process.env.Q_DEBUG = "true";
    const originalValue = Q.longStackSupport;
    Q.longStackSupport = false;
    // @ts-ignore
    const q = require("../../../../../../../../../../subject_repositories/q/q.js");
    expect(q.longStackSupport).toBe(true);
    Q.longStackSupport = originalValue;
    delete process.env.Q_DEBUG;
  });
});