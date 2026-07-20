import { spawnSync } from "child_process";
import { writeFileSync, unlinkSync } from "fs";
import path from "path";
import os from "os";

describe("Q MessageChannel window check", () => {
  it("does not create MessageChannel when window is undefined", () => {
    const qPath = path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js");
    const tmpFile = path.join(os.tmpdir(), `q_test_${Date.now()}.js`);
    
    const script = `
// Override setImmediate to be undefined (not just delete it)
global.setImmediate = undefined;
// Ensure window is undefined
if (typeof global.window !== 'undefined') {
  global.window = undefined;
}

if (typeof MessageChannel === 'undefined') {
  process.stdout.write('{"skip":true}');
  process.exit(0);
}

// Verify setImmediate is actually gone
if (typeof setImmediate === 'function') {
  process.stdout.write('{"skip":true,"reason":"setImmediate still available"}');
  process.exit(0);
}

let channelCreated = false;
const OriginalMessageChannel = global.MessageChannel;
global.MessageChannel = function() {
  channelCreated = true;
  return new OriginalMessageChannel();
};
global.MessageChannel.prototype = OriginalMessageChannel.prototype;

const Q = require(${JSON.stringify(qPath)});

process.stdout.write(JSON.stringify({channelCreated: channelCreated}));
`;
    
    writeFileSync(tmpFile, script);
    try {
      const result = spawnSync("node", [tmpFile], { timeout: 5000 });
      const output = JSON.parse(result.stdout.toString());
      if (output.skip) return;
      // Original: window undefined → inner if is false → MessageChannel NOT created
      // Mutation: if(true) → MessageChannel IS created
      expect(output.channelCreated).toBe(false);
    } finally {
      try { unlinkSync(tmpFile); } catch(e) {}
    }
  });
});