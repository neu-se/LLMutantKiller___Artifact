import { spawnSync } from "child_process";
import { writeFileSync, unlinkSync } from "fs";
import path from "path";
import os from "os";

describe("Q nextTick timing", () => {
  it("nextTick tasks execute after pre-scheduled setTimeout when window is undefined", () => {
    const qPath = path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js");
    const tmpFile = path.join(os.tmpdir(), `q_test_${Date.now()}.js`);
    
    const script = `
delete global.setImmediate;
delete global.window;
if (typeof MessageChannel === 'undefined') {
  process.stdout.write('{"skip":true}');
  process.exit(0);
}
const Q = require(${JSON.stringify(qPath)});
const order = [];
setTimeout(function() { order.push('timeout'); }, 0);
Q.nextTick(function() { order.push('nextTick'); });
setTimeout(function() {
  process.stdout.write(JSON.stringify(order));
}, 500);
`;
    
    writeFileSync(tmpFile, script);
    try {
      const result = spawnSync("node", [tmpFile], { timeout: 5000 });
      const output = JSON.parse(result.stdout.toString());
      if (output.skip) return;
      // Original: requestTick = setTimeout only, so 'timeout' fires first (scheduled first)
      // Mutation: requestTick = setTimeout + postMessage, postMessage fires as microtask BEFORE 'timeout'
      expect(output).toEqual(['timeout', 'nextTick']);
    } finally {
      try { unlinkSync(tmpFile); } catch(e) {}
    }
  });
});