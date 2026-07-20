import { execSync } from "child_process";
import * as path from "path";

describe("Q browser global loading", () => {
  it("loads Q onto window when window is defined but self is not defined", () => {
    const qPath = path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js");

    const script = `
const fs = require('fs');
let src = fs.readFileSync(${JSON.stringify(qPath)}, 'utf8');
// Disable CommonJS path so the browser global path is evaluated
src = src.replace(
  'typeof exports === "object" && typeof module === "object"',
  'false'
);
// Define window but NOT self, to exercise the window branch
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

    const result = execSync(`node -e ${JSON.stringify(script)}`, { encoding: "utf8" });
    expect(result).toBe("ok");
  });
});