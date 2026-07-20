import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("module execution", () => {
  it("should output correct message when run as main module", () => {
    // Capture console.log output
    const originalLog = console.log;
    const logs: string[] = [];
    console.log = (...args) => logs.push(args.join(' '));

    try {
      // Execute the module as main
      const modulePath = require.resolve("../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js");
      delete require.cache[modulePath];
      require(modulePath);

      // Check the console.log output
      expect(logs.some(log => log === "for testing purpose")).toBe(true);
    } finally {
      console.log = originalLog;
    }
  });
});