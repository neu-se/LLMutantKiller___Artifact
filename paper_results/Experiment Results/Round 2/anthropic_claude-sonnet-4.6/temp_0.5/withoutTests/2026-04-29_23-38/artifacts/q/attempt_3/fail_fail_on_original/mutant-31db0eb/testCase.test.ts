import { execSync } from "child_process";
import path from "path";

describe("Q window check in MessageChannel branch", () => {
  it("original code skips MessageChannel setup when window is undefined, mutation does not", () => {
    const qPath = path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js");
    
    // Script that removes setImmediate (to force MessageChannel path),
    // removes window, then loads Q and tests behavior
    const script = `
const originalSetImmediate = global.setImmediate;
delete global.setImmediate;
delete global.window;

// MessageChannel is available in Node >= 15 via worker_threads or globally
// If not global, skip - but modern Node has it globally

const Q = require(${JSON.stringify(qPath)});

// Test: call nextTick and see if it works
let called = false;
Q.nextTick(function() { called = true; });

// We need to wait for the tick - use a real setImmediate now
global.setImmediate = originalSetImmediate;
setImmediate(function() {
  if (called) {
    process.exit(0);
  } else {
    process.exit(1);
  }
});
`;
    
    let exitCode: number;
    try {
      execSync(`node -e ${JSON.stringify(script)}`, { timeout: 5000 });
      exitCode = 0;
    } catch (e: any) {
      exitCode = e.status;
    }
    
    expect(exitCode).toBe(0);
  });
});