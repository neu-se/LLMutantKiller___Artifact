import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("module execution", () => {
  it("should output correct message when run as main module", () => {
    // This test checks the console.log behavior in the main module section
    const originalLog = console.log;
    const logs: string[] = [];
    console.log = (...args) => logs.push(args.join(' '));

    try {
      // Force execution of the main module section
      delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js")];
      require("../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js");

      // The original code logs "for testing purpose" while mutated logs empty string
      expect(logs).toContain("for testing purpose");
    } finally {
      console.log = originalLog;
    }
  });
});