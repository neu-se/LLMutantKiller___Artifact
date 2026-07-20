import Q from "../q.js";

describe("Q.longStackSupport with Q_DEBUG environment variable", () => {
  it("should set Q.longStackSupport to true when Q_DEBUG is set", () => {
    const originalQDebug = process.env.Q_DEBUG;
    process.env.Q_DEBUG = "1";

    const modulePath = require.resolve("../q.js");
    delete require.cache[modulePath];

    let freshQ: any;
    try {
      freshQ = require("../q.js");
    } finally {
      if (originalQDebug === undefined) {
        delete process.env.Q_DEBUG;
      } else {
        process.env.Q_DEBUG = originalQDebug;
      }
      delete require.cache[modulePath];
    }

    expect(freshQ.longStackSupport).toBe(true);
  });
});