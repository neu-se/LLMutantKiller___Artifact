import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find sink error handling', () => {
  it('should handle true error value correctly', () => {
    const callback = jest.fn();
    const source = find((data: any) => false, callback);

    // Directly call the error handler function
    const errorHandler = (source as any)._errorHandler;
    errorHandler(true);

    expect(callback).toHaveBeenCalledWith(null, null);
  });
});