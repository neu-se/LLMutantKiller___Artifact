import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find sink error handling', () => {
  it('should handle true error value correctly', () => {
    const callback = jest.fn();
    const source = find((data: any) => false, callback);

    // Access the internal error handler by examining the returned function's properties
    const errorHandler = (source as any)._errorHandler || (source as any).abort;
    if (errorHandler) {
      errorHandler(true);
    }

    expect(callback).toHaveBeenCalledWith(null, null);
  });
});