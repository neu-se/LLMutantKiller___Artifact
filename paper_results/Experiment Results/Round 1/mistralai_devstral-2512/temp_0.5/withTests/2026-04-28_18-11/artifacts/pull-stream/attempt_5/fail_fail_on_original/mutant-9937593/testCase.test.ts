import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("drain error handling", () => {
  it("should handle error when done callback is missing and stream ends with error", (done) => {
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
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

    try {
      pull(
        mockSource,
        (pull as any).drain()
      );
    } catch (e) {
      errorThrown = true;
    }

    setTimeout(() => {
      expect(warnSpy).toHaveBeenCalled();
      const callArgs = warnSpy.mock.calls[0];
      expect(callArgs[0]).toBeInstanceOf(Error);
      expect((callArgs[0] as Error).message).toBe('no done callback supplied');
      warnSpy.mockRestore();
      done();
    }, 100);
  });
});