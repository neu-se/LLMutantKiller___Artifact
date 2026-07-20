import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("drain error handling", () => {
  it("should throw error when done callback is missing and stream ends with error", (done) => {
    const error = new Error("test error");
    let errorThrown = false;

    // Create a mock source that ends with an error
    const mockSource = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
      } else {
        cb(error);
      }
    };

    // Override console.warn to capture the warning
    const originalWarn = console.warn;
    let capturedWarning: any = null;
    console.warn = (warning: any) => {
      capturedWarning = warning;
      // Re-throw to maintain original behavior
      throw warning;
    };

    try {
      pull(
        mockSource,
        pull.drain()
      );
    } catch (e) {
      errorThrown = true;
      capturedWarning = e;
    } finally {
      console.warn = originalWarn;
    }

    expect(errorThrown).toBe(true);
    expect(capturedWarning).not.toBeNull();
    expect(capturedWarning).toBeInstanceOf(Error);
    expect((capturedWarning as Error).message).toBe('no done callback supplied');
    done();
  });
});