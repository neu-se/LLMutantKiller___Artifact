import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe("find sink", () => {
  it("should correctly handle callback parameter presence", (done) => {
    const testFn = (data: any) => data === 42;
    let callbackCalled = false;

    // Create a mock source that simulates pull-stream behavior
    const mockSource = (dest: any) => {
      let ended = false;
      const values = [10, 20, 42, 30];
      let i = 0;

      const next = () => {
        if (ended) return;
        if (i < values.length) {
          const shouldContinue = dest(null, values[i++]);
          if (shouldContinue) {
            setImmediate(next);
          } else {
            ended = true;
          }
        } else {
          dest(true);
          ended = true;
        }
      };

      next();
    };

    // Test with callback provided
    const sinkWithCallback = find(testFn, (err: any, data: any) => {
      callbackCalled = true;
      expect(err).toBeNull();
      expect(data).toBe(42);
      done();
    });

    mockSource(sinkWithCallback);
  });
});