import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";

describe('find sink error handling', () => {
  it('should handle true error value correctly', () => {
    const callback = jest.fn();
    const source = find((data: any) => false, callback);

    // Simulate the error path by calling the abort function directly
    (source as any).abort(true, () => {});

    expect(callback).toHaveBeenCalledWith(null, null);
  });
});