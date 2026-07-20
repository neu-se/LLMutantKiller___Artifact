import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe("find sink", () => {
  it("should handle callback parameter correctly", () => {
    const testFn = (data: any) => data === 42;
    let callbackInvoked = false;
    let callbackError: any = null;
    let callbackData: any = null;

    // Create a mock source that implements pull-stream protocol
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
      callbackInvoked = true;
      callbackError = err;
      callbackData = data;
    });

    // Manually drive the stream
    const source = mockSource(null, (end: any, data: any) => {
      if (!end) {
        sinkWithCallback(null, data);
      } else {
        sinkWithCallback(true);
      }
    });

    // Execute the stream
    source(null, () => {});

    // Verify results
    expect(callbackInvoked).toBe(true);
    expect(callbackError).toBeNull();
    expect(callbackData).toBe(42);
  });
});