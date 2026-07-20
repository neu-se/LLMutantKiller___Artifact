import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find sink error handling', () => {
  it('should handle true error value correctly', () => {
    const callback = jest.fn();
    const source = find((data: any) => false, callback);

    // The source is a drain function that needs to be called with error
    const drainFunction = source;
    drainFunction(true, null, () => {});

    expect(callback).toHaveBeenCalledWith(null, null);
  });
});