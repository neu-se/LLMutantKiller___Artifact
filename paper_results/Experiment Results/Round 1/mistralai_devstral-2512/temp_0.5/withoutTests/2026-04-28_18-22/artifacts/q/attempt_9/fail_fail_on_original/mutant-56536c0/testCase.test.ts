import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("MessageChannel async behavior", () => {
  it("should use MessageChannel when available", (done) => {
    const originalMessageChannel = global.MessageChannel;
    let messageChannelUsed = false;

    global.MessageChannel = class {
      port1: any;
      port2: any;
      constructor() {
        this.port1 = {
          onmessage: () => {
            messageChannelUsed = true;
          },
          postMessage: () => {}
        };
        this.port2 = {
          postMessage: () => {}
        };
      }
    };

    Q.nextTick(() => {
      global.MessageChannel = originalMessageChannel;
      expect(messageChannelUsed).toBe(true);
      done();
    });
  });
});