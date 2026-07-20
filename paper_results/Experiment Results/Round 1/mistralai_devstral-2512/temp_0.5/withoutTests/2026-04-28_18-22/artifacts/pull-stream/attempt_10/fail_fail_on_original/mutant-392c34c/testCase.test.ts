import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find sink error handling', () => {
  it('should handle true error value correctly', () => {
    const callback = jest.fn();
    const source = find((data: any) => false, callback);

    // Directly call the error handler by accessing the internal function
    const errorHandler = (source as any).abort;
    if (errorHandler) {
      errorHandler(true);
    } else {
      // If abort isn't available, try to trigger the error path through the source function
      try {
        source(true);
      } catch (e) {
        // Error path should still call the callback
      }
    }

    expect(callback).toHaveBeenCalledWith(null, null);
  });
});