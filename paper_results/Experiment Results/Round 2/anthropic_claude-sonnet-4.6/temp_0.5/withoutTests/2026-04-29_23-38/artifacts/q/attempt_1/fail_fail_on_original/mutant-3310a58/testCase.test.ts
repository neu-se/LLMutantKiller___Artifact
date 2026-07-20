import { execSync } from "child_process";
import * as path from "path";

describe("Q module initialization with missing process", () => {
  it("should not throw when process is null/undefined during module load", () => {
    // Run a script that sets process to null before requiring Q
    const script = `
      const originalProcess = global.process;
      global.process = null;
      try {
        require(${JSON.stringify(path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js"))});
        process.stdout.write("success");
      } catch (e) {
        process.stdout.write("error: " + e.message);
      } finally {
        global.process = originalProcess;
      }
    `;
    const result = execSync(`node -e "${script.replace(/"/g, '\\"').replace(/\n/g, ' ')}"`).toString();
    expect(result).toBe("success");
  });
});