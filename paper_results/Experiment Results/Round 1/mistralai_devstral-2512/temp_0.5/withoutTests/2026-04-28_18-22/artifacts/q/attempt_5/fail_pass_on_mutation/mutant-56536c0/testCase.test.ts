import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("MessageChannel detection", () => {
  it("should detect MessageChannel availability correctly", () => {
    const originalMessageChannel = global.MessageChannel;

    try {
      global.MessageChannel = undefined;
      const q1 = Q;
      expect(q1.nextTick).toBeDefined();

      global.MessageChannel = class MockMessageChannel {
        port1: any;
        port2: any;
        constructor() {
          this.port1 = { onmessage: null, postMessage: () => {} };
          this.port2 = { postMessage: () => {} };
        }
      };

      const q2 = Q;
      expect(q2.nextTick).toBeDefined();

      return Promise.resolve().then(() => {
        global.MessageChannel = originalMessageChannel;
      });
    } finally {
      global.MessageChannel = originalMessageChannel;
    }
  });
});