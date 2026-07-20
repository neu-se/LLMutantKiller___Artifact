import { execSync } from "child_process";
import { join } from "path";

describe("Q captureLine guard", () => {
  it("should load Q module without throwing even when stack line is unparseable", () => {
    // Run a child process that loads Q with a manipulated Error.prepareStackTrace
    // to produce unparseable stack lines, triggering the null guard in captureLine
    const script = `
      const originalPrepare = Error.prepareStackTrace;
      Error.prepareStackTrace = (err, frames) => {
        return frames.map(() => 'unparseable frame with no location').join('\\n');
      };
      try {
        require('./q.js');
        console.log('success');
      } catch(e) {
        console.log('error: ' + e.message);
      }
    `;
    
    const result = execSync(`node -e "${script.replace(/"/g, '\\"')}"`, {
      cwd: join(__dirname, "../../../../../../../../../../../subject_repositories/q"),
      encoding: "utf8"
    });
    
    expect(result.trim()).toBe("success");
  });
});