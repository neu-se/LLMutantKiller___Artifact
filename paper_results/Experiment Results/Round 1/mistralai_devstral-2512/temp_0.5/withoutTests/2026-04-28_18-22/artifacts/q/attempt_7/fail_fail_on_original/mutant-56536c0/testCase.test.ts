import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("MessageChannel detection", () => {
  it("should use MessageChannel when available", (done) => {
    const originalMessageChannel = global.MessageChannel;
    let executionOrder: string[] = [];

    global.MessageChannel = class {
      port1: any;
      port2: any;
      constructor() {
        this.port1 = {
          onmessage: () => {
            executionOrder.push("MessageChannel");
          },
          postMessage: () => {}
        };
        this.port2 = {
          postMessage: () => {
            executionOrder.push("postMessage");
          }
        };
      }
    };

    Q.nextTick(() => {
      global.MessageChannel = originalMessageChannel;
      expect(executionOrder).toContain("MessageChannel");
      expect(executionOrder).toContain("postMessage");
      done();
    });
  });
});