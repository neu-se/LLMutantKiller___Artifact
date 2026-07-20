import { spawnSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";

describe("Q module initialization guard for process", () => {
  it("should load without error when process is not an object", () => {
    // Write a temporary script that undefines process before loading Q
    const tmpDir = os.tmpdir();
    const scriptPath = path.join(tmpDir, "test_q_no_process.js");
    const qPath = path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js");
    
    const scriptContent = `
      // Override process to be undefined to test the guard
      const origProcess = global.process;
      global.process = undefined;
      try {
        // Clear require cache if needed
        delete require.cache[require.resolve(${JSON.stringify(qPath)})];
        require(${JSON.stringify(qPath)});
        origProcess.stdout.write("success\\n");
      } catch (e) {
        origProcess.stdout.write("error: " + e.message + "\\n");
        origProcess.exit(1);
      } finally {
        global.process = origProcess;
      }
    `;
    
    fs.writeFileSync(scriptPath, scriptContent);
    
    try {
      const result = spawnSync(process.execPath, [scriptPath], { encoding: "utf8" });
      expect(result.stdout.trim()).toBe("success");
      expect(result.status).toBe(0);
    } finally {
      fs.unlinkSync(scriptPath);
    }
  });
});