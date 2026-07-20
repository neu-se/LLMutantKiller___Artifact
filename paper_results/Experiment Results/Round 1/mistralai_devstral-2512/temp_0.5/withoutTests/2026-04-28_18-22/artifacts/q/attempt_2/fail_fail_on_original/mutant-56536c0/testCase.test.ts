import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("MessageChannel async behavior", () => {
  it("should use MessageChannel when available for nextTick", (done) => {
    const originalMessageChannel = global.MessageChannel;
    const originalSetTimeout = global.setTimeout;

    let nextTickUsedMessageChannel = false;
    let nextTickUsedSetTimeout = false;

    global.MessageChannel = class {
      constructor() {
        this.port1 = {
          onmessage: () => {
            nextTickUsedMessageChannel = true;
          },
          postMessage: () => {}
        };
        this.port2 = {
          postMessage: () => {}
        };
      }
    };

    global.setTimeout = function(fn: () => void, delay: number) {
      if (delay === 0) {
        nextTickUsedSetTimeout = true;
      }
      return originalSetTimeout(fn, delay);
    };

    Q.nextTick(() => {
      global.setTimeout = originalSetTimeout;
      global.MessageChannel = originalMessageChannel;

      if (typeof MessageChannel !== "undefined") {
        expect(nextTickUsedMessageChannel).toBe(true);
        expect(nextTickUsedSetTimeout).toBe(false);
      }
      done();
    });
  });
});