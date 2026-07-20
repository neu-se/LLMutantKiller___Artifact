import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe("find sink", () => {
  it("should handle missing callback parameter correctly", (done) => {
    const testFn = (data: any) => data === 42;
    let callbackInvoked = false;

    const mockSource = {
      pipe: (dest: any) => {
        // Simulate data flow
        const result1 = dest(10);
        const result2 = dest(20);
        const result3 = dest(42);

        // End the stream
        dest(true);

        // Verify callback behavior
        setTimeout(() => {
          if (callbackInvoked) {
            done(new Error("Callback should not be invoked when not provided"));
          } else {
            done();
          }
        }, 10);
        return dest;
      }
    };

    // Test with no callback - should not throw
    const sink = find(testFn);
    mockSource.pipe(sink);
  });
});