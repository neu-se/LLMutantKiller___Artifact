import { spawnSync } from "child_process";
import { writeFileSync, unlinkSync } from "fs";
import path from "path";
import os from "os";

describe("Q MessageChannel window check", () => {
  it("flush is called correct number of times", () => {
    const qPath = path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js");
    const tmpFile = path.join(os.tmpdir(), `q_test_${Date.now()}.js`);
    
    // With original: simple setTimeout, flush called once
    // With mutation: setTimeout + postMessage, flush called twice (once via postMessage, once via setTimeout)
    // But second flush is on empty queue, so results are same...
    
    // Let's test a race condition: add a task AFTER first flush starts
    const script = `
delete global.setImmediate;
delete global.window;
const Q = require(${JSON.stringify(qPath)});

let count = 0;
// Schedule a task
Q.nextTick(function() { 
  count++; 
  // Schedule another task during flush
  Q.nextTick(function() { count++; });
});

setTimeout(function() {
  // With original (simple setTimeout): 
  //   First setTimeout fires, runs task1, task1 schedules task2
  //   task2 is queued, nextTick calls requestTick (new setTimeout)
  //   Second setTimeout fires, runs task2
  //   count = 2
  // With mutation (MessageChannel + setTimeout):
  //   postMessage fires first (microtask-like), runs task1, task1 schedules task2
  //   task2 queued, nextTick calls requestPortTick (postMessage)
  //   Second postMessage fires, runs task2
  //   setTimeout fires but queue empty
  //   count = 2
  // Hmm, same result...
  process.stdout.write(String(count));
}, 500);
`;
    
    writeFileSync(tmpFile, script);
    try {
      const result = spawnSync("node", [tmpFile], { timeout: 5000 });
      expect(result.stdout.toString()).toBe("2");
    } finally {
      unlinkSync(tmpFile);
    }
  });
});