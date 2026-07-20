import * as pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("drain error handling", () => {
  it("should throw error when done callback is missing and stream ends with error", (done) => {
    const error = new Error("test error");
    let errorThrown = false;

    // Create a mock source that ends with an error
    const mockSource = (abort, cb) => {
      if (abort) {
        cb(abort);
      } else {
        cb(error);
      }
    };

    // Spy on console.warn to check if the expected warning is logged
    const originalWarn = console.warn;
    console.warn = jest.fn();

    try {
      pull(
        mockSource,
        pull.drain()
      );
    } catch (e) {
      errorThrown = true;
    } finally {
      // Restore console.warn
      console.warn = originalWarn;
    }

    setTimeout(() => {
      expect(errorThrown).toBe(true);
      expect(console.warn).toHaveBeenCalledWith(expect.any(Error));
      done();
    }, 100);
  });
});