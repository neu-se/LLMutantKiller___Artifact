import { spawnSync } from "child_process";
import { writeFileSync, unlinkSync } from "fs";
import path from "path";
import os from "os";

describe("Q", () => {
  it("does not instantiate MessageChannel when window is undefined", () => {
    const qPath = path.resolve(__dirname, "../../../../../../../../../../../subject_repositories/q/q.js");
    const tmpFile = path.join(os.tmpdir(), `q_test_${Date.now()}.js`);
    
    const script = `
const vm = require('vm');
const fs = require('fs');
const src = fs.readFileSync(${JSON.stringify(qPath)}, 'utf8');

let channelCreated = false;

// Create a context with no window, no setImmediate, but with MessageChannel
const ctx = vm.createContext({
  exports: {},
  module: { exports: {} },
  require: require,
  process: process,
  setTimeout: setTimeout,
  clearTimeout: clearTimeout,
  console: console,
  MessageChannel: class {
    constructor() { channelCreated = true; this.port1 = {set onmessage(v){}}; this.port2 = {postMessage(){}}; }
  },
  // window is intentionally absent
  // setImmediate is intentionally absent
});
ctx.module.exports = ctx.exports;

try {
  vm.runInContext(src, ctx);
} catch(e) {}

process.stdout.write(channelCreated ? 'true' : 'false');
`;
    
    writeFileSync(tmpFile, script);
    try {
      const result = spawnSync("node", [tmpFile], { timeout: 5000 });
      const output = result.stdout.toString().trim();
      // Original: typeof window === "undefined" → condition false → MessageChannel NOT created
      // Mutation: if(true) → MessageChannel IS created
      expect(output).toBe('false');
    } finally {
      try { unlinkSync(tmpFile); } catch(e) {}
    }
  });
});