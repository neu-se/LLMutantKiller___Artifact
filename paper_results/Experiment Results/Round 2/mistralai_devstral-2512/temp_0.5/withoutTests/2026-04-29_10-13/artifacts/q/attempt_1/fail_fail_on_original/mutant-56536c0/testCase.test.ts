import { Q } from "./q.js";

describe("MessageChannel detection", () => {
  it("should use MessageChannel when available for async scheduling", (done) => {
    const originalMessageChannel = global.MessageChannel;
    global.MessageChannel = function() {
      this.port1 = { onmessage: null, postMessage: () => {} };
      this.port2 = { postMessage: () => {} };
    };

    let schedulerUsed = false;
    const originalNextTick = Q.nextTick;
    Q.nextTick = function(task) {
      schedulerUsed = true;
      originalNextTick(task);
    };

    Q.resolve(42).then((value) => {
      expect(value).toBe(42);
      expect(schedulerUsed).toBe(true);
      global.MessageChannel = originalMessageChannel;
      done();
    });
  });
});