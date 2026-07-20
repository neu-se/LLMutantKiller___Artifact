describe("Q", () => {
  it("uses MessageChannel not setTimeout when setImmediate unavailable", (done) => {
    jest.resetModules();
    
    const origSetImmediate = (global as any).setImmediate;
    const origProcessNextTick = process.nextTick;
    const origSetTimeout = global.setTimeout;
    const origMessageChannel = (global as any).MessageChannel;
    
    delete (global as any).setImmediate;
    (process as any).nextTick = undefined;
    
    let messageChannelUsed = false;
    
    (global as any).MessageChannel = class {
      port1: any = { onmessage: null as any };
      port2: any;
      constructor() {
        const port1 = this.port1;
        this.port2 = {
          postMessage: () => {
            messageChannelUsed = true;
            // Actually invoke the handler so Q can flush
            if (port1.onmessage) port1.onmessage();
          }
        };
      }
    };
    
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    process.nextTick = origProcessNextTick;
    
    Q.nextTick(() => {
      (global as any).setImmediate = origSetImmediate;
      (global as any).MessageChannel = origMessageChannel;
      
      // Original: MessageChannel branch taken -> messageChannelUsed = true
      // Mutated: MessageChannel branch skipped (false) -> messageChannelUsed = false, setTimeout used
      expect(messageChannelUsed).toBe(true);
      done();
    });
  });
});