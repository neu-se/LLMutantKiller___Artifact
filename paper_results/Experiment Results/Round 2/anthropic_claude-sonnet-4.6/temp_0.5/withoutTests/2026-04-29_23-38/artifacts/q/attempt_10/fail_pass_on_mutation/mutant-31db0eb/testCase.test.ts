import { spawnSync } from "child_process";
import { writeFileSync, unlinkSync } from "fs";
import path from "path";
import os from "os";

describe("Q", () => {
  it("window check controls MessageChannel setup", () => {
    const qPath = path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js");
    const tmpFile = path.join(os.tmpdir(), `q_test_${Date.now()}.js`);
    
    // Directly test the condition by patching the source
    // Original: if (typeof window !== "undefined") { ... MessageChannel setup ... }
    // Mutation: if (true) { ... MessageChannel setup ... }
    // We verify by checking if MessageChannel is created when window is undefined
    
    const script = `
const fs = require('fs');
let src = fs.readFileSync(${JSON.stringify(qPath)}, 'utf8');

// Count how many times "new MessageChannel" would be called
// by checking if the condition evaluates correctly
// We do this by replacing the condition with a known false value
// and seeing if MessageChannel gets created

let channelCreated = false;
const OrigMC = global.MessageChannel;
if (OrigMC) {
  global.MessageChannel = function() {
    channelCreated = true;
    const inst = new OrigMC();
    return inst;
  };
  global.MessageChannel.prototype = OrigMC.prototype;
}

// Force the condition to be testable: temporarily make window undefined
const savedWindow = global.window;
Object.defineProperty(global, 'window', {
  value: undefined,
  writable: true,
  configurable: true
});

// Also remove setImmediate
const savedSetImmediate = global.setImmediate;
Object.defineProperty(global, 'setImmediate', {
  value: undefined,
  writable: true,
  configurable: true
});

// Clear require cache and reload
Object.keys(require.cache).forEach(k => { if (k.includes('q.js')) delete require.cache[k]; });

try {
  require(${JSON.stringify(qPath)});
} catch(e) {}

// Restore
Object.defineProperty(global, 'window', { value: savedWindow, writable: true, configurable: true });
Object.defineProperty(global, 'setImmediate', { value: savedSetImmediate, writable: true, configurable: true });
if (OrigMC) global.MessageChannel = OrigMC;

process.stdout.write(channelCreated ? 'true' : 'false');
`;
    
    writeFileSync(tmpFile, script);
    try {
      const result = spawnSync("node", [tmpFile], { timeout: 5000 });
      const output = result.stdout.toString().trim();
      // Original: window is undefined → condition false → MessageChannel NOT created → 'false'
      // Mutation: if(true) → MessageChannel IS created → 'true'
      expect(output).toBe('false');
    } finally {
      try { unlinkSync(tmpFile); } catch(e) {}
    }
  });
});