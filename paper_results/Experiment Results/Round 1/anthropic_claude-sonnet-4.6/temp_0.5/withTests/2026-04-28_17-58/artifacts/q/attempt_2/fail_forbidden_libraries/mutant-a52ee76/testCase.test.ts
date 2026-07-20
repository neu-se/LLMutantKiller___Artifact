import { execSync } from "child_process";
import * as path from "path";

describe("Q.longStackSupport initialization from Q_DEBUG environment variable", () => {
  it("should set Q.longStackSupport to true at module load time when Q_DEBUG is set", () => {
    // We need to load the module fresh with Q_DEBUG set in the environment
    // Use a child process to load the module with Q_DEBUG set, and check the result
    const scriptPath = path.resolve(
      __dirname,
      "../../../../../../../../../../../subject_repositories/q/q.js"
    );

    const result = execSync(
      `node -e "process.env.Q_DEBUG = '1'; const Q = require('${scriptPath}'); process.stdout.write(String(Q.longStackSupport));"`,
      { encoding: "utf8" }
    );

    expect(result.trim()).toBe("true");
  });
});