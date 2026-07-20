import { spawnSync } from "child_process";
import { writeFileSync, unlinkSync } from "fs";
import path from "path";
import os from "os";

describe("Q MessageChannel initialization", () => {
  it("does not create MessageChannel when window is undefined", () => {
    const qPath = path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js");
    const tmpFile = path.join(os.tmpdir(), `q_test_${Date.now()}.js`);
    
    const script = `
delete global.setImmediate;
delete global.window;

if (typeof MessageChannel === 'undefined') {
  process.stdout.write('{"skip":true}');
  process.exit(0);
}

let channelCreated = false;
const OriginalMessageChannel = global.MessageChannel;
global.MessageChannel = function() {
  channelCreated = true;
  const instance = new OriginalMessageChannel();
  return instance;
};
Object.setPrototypeOf(global.MessageChannel, OriginalMessageChannel);
global.MessageChannel.prototype = OriginalMessageChannel.prototype;

const Q = require(${JSON.stringify(qPath)});

process.stdout.write(JSON.stringify({channelCreated: channelCreated}));
`;
    
    writeFileSync(tmpFile, script);
    try {
      const result = spawnSync("node", [tmpFile], { timeout: 5000 });
      const output = JSON.parse(result.stdout.toString());
      if (output.skip) return;
      // Original: window is undefined, so MessageChannel is NOT created
      // Mutation: if(true) always creates MessageChannel
      expect(output.channelCreated).toBe(false);
    } finally {
      try { unlinkSync(tmpFile); } catch(e) {}
    }
  });
});