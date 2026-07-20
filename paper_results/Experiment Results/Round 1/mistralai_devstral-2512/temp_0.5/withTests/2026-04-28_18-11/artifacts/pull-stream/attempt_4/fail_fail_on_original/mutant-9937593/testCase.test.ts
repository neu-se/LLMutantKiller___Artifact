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

    // Spy on console.warn to check if the expected warning is logged
    const originalWarn = console.warn;
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    try {
      pull(
        mockSource,
        (pull as any).drain()
      );
    } catch (e) {
      errorThrown = true;
    } finally {
      // Restore console.warn
      warnSpy.mockRestore();
    }

    setTimeout(() => {
      expect(errorThrown).toBe(true);
      expect(warnSpy).toHaveBeenCalledWith(expect.objectContaining({
        message: 'no done callback supplied'
      }));
      done();
    }, 100);
  });
});