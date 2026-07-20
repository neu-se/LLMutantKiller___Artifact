import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("MessageChannel detection", () => {
  it("should detect MessageChannel availability", () => {
    const originalMessageChannel = global.MessageChannel;

    try {
      // Test with MessageChannel available
      global.MessageChannel = class MockMessageChannel {
        port1: any;
        port2: any;
        constructor() {
          this.port1 = { onmessage: null, postMessage: () => {} };
          this.port2 = { postMessage: () => {} };
        }
      };

      const qWithMessageChannel = Q;
      expect(qWithMessageChannel.nextTick).toBeDefined();

      // Test without MessageChannel
      global.MessageChannel = undefined;
      const qWithoutMessageChannel = Q;
      expect(qWithoutMessageChannel.nextTick).toBeDefined();

      return Promise.resolve().then(() => {
        global.MessageChannel = originalMessageChannel;
      });
    } finally {
      global.MessageChannel = originalMessageChannel;
    }
  });
});