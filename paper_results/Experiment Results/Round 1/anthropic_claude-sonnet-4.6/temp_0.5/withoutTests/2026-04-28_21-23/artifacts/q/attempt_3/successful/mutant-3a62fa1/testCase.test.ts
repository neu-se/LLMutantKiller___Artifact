import { execFileSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";

describe("Q nextTick process type guard", () => {
  it("should load without error when process is not an object", () => {
    const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    const outputFile = path.join(os.tmpdir(), `q_test_out_${Date.now()}.txt`);
    
    const script = `
const fs = require('fs');
const outputFile = ${JSON.stringify(outputFile)};

// Override process to undefined before Q loads
const realProcess = global.process;
Object.defineProperty(global, 'process', {
  value: undefined,
  writable: true,
  configurable: true
});

let error = null;
try {
  require(${JSON.stringify(qPath)});
} catch(e) {
  error = e.message;
}

// Restore process
Object.defineProperty(global, 'process', {
  value: realProcess,
  writable: true,
  configurable: true
});

fs.writeFileSync(outputFile, error ? 'ERROR:' + error : 'OK');
`;
    
    const tmpScript = path.join(os.tmpdir(), `q_test_${Date.now()}.js`);
    fs.writeFileSync(tmpScript, script);
    
    try {
      execFileSync(process.execPath, [tmpScript], { timeout: 5000 });
      const output = fs.readFileSync(outputFile, 'utf8');
      fs.unlinkSync(tmpScript);
      fs.unlinkSync(outputFile);
      expect(output).toBe("OK");
    } catch(e) {
      try { fs.unlinkSync(tmpScript); } catch(_) {}
      try { fs.unlinkSync(outputFile); } catch(_) {}
      throw e;
    }
  });
});