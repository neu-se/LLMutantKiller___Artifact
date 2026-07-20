import { execSync } from "child_process";
import * as path from "path";
import * as fs from "fs";
import * as os from "os";

describe("Q browser global loading", () => {
  it("loads Q onto window when window is defined but self is not defined", () => {
    const qPath = path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js");

    const scriptContent = `
var fs = require('fs');
var src = fs.readFileSync(${JSON.stringify(qPath)}, 'utf8');
// Disable CommonJS path so the browser global path is evaluated
src = src.replace(
  'typeof exports === "object" && typeof module === "object"',
  'false'
);
// Define window but NOT self, to exercise the window-only branch
var window = {};
try {
  eval(src);
  if (window.Q && typeof window.Q.defer === 'function') {
    process.stdout.write('ok');
  } else {
    process.stdout.write('fail: Q not set on window');
  }
} catch(e) {
  process.stdout.write('error: ' + e.message);
}
`;

    const tmpFile = path.join(os.tmpdir(), "q_browser_test_" + process.pid + ".js");
    fs.writeFileSync(tmpFile, scriptContent);

    try {
      const result = execSync(`node ${JSON.stringify(tmpFile)}`, { encoding: "utf8" });
      expect(result).toBe("ok");
    } finally {
      fs.unlinkSync(tmpFile);
    }
  });
});