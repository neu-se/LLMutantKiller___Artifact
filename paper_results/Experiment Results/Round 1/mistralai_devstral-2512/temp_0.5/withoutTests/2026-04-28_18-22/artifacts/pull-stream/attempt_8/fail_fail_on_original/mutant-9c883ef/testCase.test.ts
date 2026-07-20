import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe("find sink", () => {
  it("should correctly handle callback parameter presence", (done) => {
    const testFn = (data: any) => data === 42;
    let callbackCalled = false;

    // Create a mock source that properly implements pull-stream protocol
    const mockSource = (abort: any, cb: any) => {
      const values = [10, 20, 42, 30];
      let i = 0;

      const next = () => {
        if (i < values.length) {
          cb(null, values[i++]);
        } else {
          cb(true);
        }
      };

      return next;
    };

    // Test with callback provided
    const sinkWithCallback = find(testFn, (err: any, data: any) => {
      callbackCalled = true;
      expect(err).toBeNull();
      expect(data).toBe(42);
      done();
    });

    // Manually drive the stream
    const source = mockSource(null, (end: any, data: any) => {
      if (!end) {
        const shouldContinue = sinkWithCallback(null, data);
        if (shouldContinue) {
          setImmediate(() => source(null, sinkWithCallback));
        }
      } else {
        sinkWithCallback(true);
      }
    });
  });
});