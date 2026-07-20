import { execSync } from "child_process";
import * as path from "path";

describe("module main execution block", () => {
  it("should print 'for testing purpose' when executed as main script", () => {
    const modulePath = path.resolve(
      __dirname,
      "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"
    );
    let output: string;
    try {
      output = execSync(`node "${modulePath}"`, {
        encoding: "utf8",
        timeout: 5000,
      });
    } catch (e: any) {
      // The script may exit with an error due to the debugger statement or other issues
      // but we still want to check stdout
      output = e.stdout || "";
    }
    expect(output).toContain("for testing purpose");
  });
});