import { jest } from "@jest/globals";

describe("Q uses MessageChannel for scheduling when available", () => {
  it("calls port2.postMessage when MessageChannel is available", (done) => {
    jest.resetModules();

    const postMessageCalls: number[] = [];
    const OriginalMessageChannel = (global as any).MessageChannel;

    (global as any).MessageChannel = class MockMessageChannel {
      port1: { onmessage: ((e: any) => void) | null };
      port2: { postMessage: (msg: any) => void };

      constructor() {
        const self = this;
        this.port1 = { onmessage: null };
        this.port2 = {
          postMessage(msg: any) {
            postMessageCalls.push(msg);
            Promise.resolve().then(() => {
              if (self.port1.onmessage) {
                self.port1.onmessage({ data: msg });
              }
            });
          }
        };
      }
    };

    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

    Q.nextTick(() => {
      try {
        expect(postMessageCalls.length).toBeGreaterThan(0);
        done();
      } catch (e) {
        done(e);
      } finally {
        (global as any).MessageChannel = OriginalMessageChannel;
      }
    });
  });
});