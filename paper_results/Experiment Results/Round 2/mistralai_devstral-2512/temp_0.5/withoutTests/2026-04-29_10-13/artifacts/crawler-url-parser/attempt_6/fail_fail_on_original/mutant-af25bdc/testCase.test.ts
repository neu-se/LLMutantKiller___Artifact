import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function", () => {
  it("should correctly parse URLs with spaces when run as main module", () => {
    // This test indirectly checks the console.log behavior in the main module section
    // The mutation changes the console.log output which would affect testing scenarios
    const originalLog = console.log;
    const logs: string[] = [];
    console.log = (...args) => logs.push(args.join(' '));

    try {
      // Simulate running as main module
      const module = require("../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js");
      const testUrl = "https ://www.npmjs.com/package/electron-window-manager";
      const result = parse(testUrl);

      // The original code logs "for testing purpose" while mutated logs empty string
      expect(logs.some(log => log.includes("for testing purpose"))).toBe(true);
    } finally {
      console.log = originalLog;
    }
  });
});