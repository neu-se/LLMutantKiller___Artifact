import { execSync } from "child_process";
import * as path from "path";

describe("Q.longStackSupport with Q_DEBUG environment variable", () => {
  it("should set Q.longStackSupport to true when Q_DEBUG environment variable is set", () => {
    // Run a child process with Q_DEBUG set so the module initializes with the env var present
    const modulePath = path.resolve(
      __dirname,
      "../../../../../../../../../../../subject_repositories/q/q.js"
    );

    const script = `
      const Q = require(${JSON.stringify(modulePath)});
      process.stdout.write(String(Q.longStackSupport));
    `;

    const result = execSync(`node -e ${JSON.stringify(script)}`, {
      env: { ...process.env, Q_DEBUG: "1" },
      encoding: "utf8",
    });

    // In original code: Q.longStackSupport = true is set when Q_DEBUG is present
    // In mutated code: the assignment is removed, so it stays false
    expect(result.trim()).toBe("true");
  });
});