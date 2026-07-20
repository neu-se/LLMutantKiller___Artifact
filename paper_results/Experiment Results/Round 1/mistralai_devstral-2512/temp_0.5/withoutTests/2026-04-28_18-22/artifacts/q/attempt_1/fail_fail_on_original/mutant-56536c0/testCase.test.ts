import { Q } from "./q.js";

describe("MessageChannel detection", () => {
  it("should use MessageChannel when available for async operations", (done) => {
    const originalMessageChannel = global.MessageChannel;
    global.MessageChannel = function() {
      this.port1 = { onmessage: null, postMessage: () => {} };
      this.port2 = { postMessage: () => {} };
    };

    let usedMessageChannel = false;
    const originalSetTimeout = global.setTimeout;
    global.setTimeout = function(fn, delay) {
      if (delay === 0) {
        usedMessageChannel = false;
      }
      return originalSetTimeout(fn, delay);
    };

    Q.nextTick(() => {
      global.setTimeout = originalSetTimeout;
      global.MessageChannel = originalMessageChannel;
      expect(usedMessageChannel).toBe(true);
      done();
    });
  });
});