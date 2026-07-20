import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find sink error handling', () => {
  it('should handle true error value correctly', () => {
    const callback = jest.fn();
    const source = find((data: any) => false, callback);

    // Create a mock source that immediately calls the error handler
    const mockSource = (abort: any, cb: any) => {
      if (abort) {
        const errorHandler = (source as any).abort || (source as any)._errorHandler;
        if (errorHandler) {
          errorHandler(true);
        }
      }
    };

    source(null, mockSource, () => {});

    expect(callback).toHaveBeenCalledWith(null, null);
  });
});