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
      const module = require(modulePath);

      // The original code logs "for testing purpose" while mutated logs empty string
      // We need to check if any log contains the expected message
      const hasExpectedLog = logs.some(log =>
        log.includes("for testing purpose") ||
        log.includes("for") && log.includes("testing") && log.includes("purpose")
      );

      expect(hasExpectedLog).toBe(true);
    } finally {
      console.log = originalLog;
    }
  });
});