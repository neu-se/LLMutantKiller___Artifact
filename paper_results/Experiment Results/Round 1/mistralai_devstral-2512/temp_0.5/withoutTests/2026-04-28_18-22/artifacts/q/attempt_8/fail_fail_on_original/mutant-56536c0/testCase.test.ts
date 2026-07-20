import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("MessageChannel detection", () => {
  it("should detect MessageChannel availability and use it", (done) => {
    const originalMessageChannel = global.MessageChannel;
    let messageChannelUsed = false;

    global.MessageChannel = class {
      port1: any;
      port2: any;
      constructor() {
        messageChannelUsed = true;
        this.port1 = {
          onmessage: () => {},
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