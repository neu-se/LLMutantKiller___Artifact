import { execSync } from "child_process";
import * as path from "path";

describe("captureLine hasStacks guard", () => {
  it("should not throw when Error stack is unavailable during module initialization", () => {
    // Run a child process that loads Q with stacks disabled
    const script = `
      // Override Error to not produce stacks before requiring Q
      const OriginalError = Error;
      function NoStackError(msg) {
        const e = new OriginalError(msg);
        e.stack = undefined;
        return e;
      }
      NoStackError.prototype = OriginalError.prototype;
      global.Error = NoStackError;
      
      try {
        require(${JSON.stringify(path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"))});
        process.exit(0);
      } catch(e) {
        process.exit(1);
      }
    `;
    
    let exitCode: number;
    try {
      execSync(`node -e "${script.replace(/"/g, '\\"').replace(/\n/g, ' ')}"`, { timeout: 5000 });
      exitCode = 0;
    } catch (e: any) {
      exitCode = e.status || 1;
    }
    
    expect(exitCode).toBe(0);
  });
});