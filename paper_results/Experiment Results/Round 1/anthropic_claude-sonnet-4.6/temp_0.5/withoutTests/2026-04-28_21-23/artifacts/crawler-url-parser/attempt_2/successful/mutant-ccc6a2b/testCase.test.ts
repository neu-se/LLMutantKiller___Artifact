import { execSync } from "child_process";
import * as path from "path";

describe("crawler-url-parser main module execution", () => {
  it("should print 'for testing purpose' when run directly as main module", () => {
    const modulePath = path.resolve(
      __dirname,
      "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"
    );
    const output = execSync(`node "${modulePath}"`).toString();
    expect(output).toContain("for testing purpose");
  });
});