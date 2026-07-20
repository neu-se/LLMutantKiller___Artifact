import { execSync } from "child_process";
import * as path from "path";
import * as fs from "fs";
import * as os from "os";

describe("Q.longStackSupport with Q_DEBUG environment variable", () => {
  it("should set Q.longStackSupport to true when Q_DEBUG environment variable is set", () => {
    const modulePath = path.resolve(
      __dirname,
      "../../../../../../../../../../../subject_repositories/q/q.js"
    );

    // Write a temp script file to avoid escaping issues
    const tmpFile = path.join(os.tmpdir(), "q_debug_test_" + Date.now() + ".js");
    fs.writeFileSync(
      tmpFile,
      `var Q = require(${JSON.stringify(modulePath)});\nprocess.stdout.write(String(Q.longStackSupport));\n`
    );

    try {
      const result = execSync(`node ${tmpFile}`, {
        env: { ...process.env, Q_DEBUG: "1" },
        encoding: "utf8",
      });

      // In original code: Q.longStackSupport = true is set when Q_DEBUG is present
      // In mutated code: the assignment is removed, so it stays false
      expect(result.trim()).toBe("true");
    } finally {
      fs.unlinkSync(tmpFile);
    }
  });
});