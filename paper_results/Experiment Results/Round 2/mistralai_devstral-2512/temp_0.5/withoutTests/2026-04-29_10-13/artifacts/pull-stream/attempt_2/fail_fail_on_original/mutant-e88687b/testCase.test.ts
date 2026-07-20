import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink abort functionality', () => {
  it('should correctly handle abort when first argument is a function', () => {
    const sink = drain(() => false);
    const mockRead = jest.fn((abort: any, cb: any) => {
      cb();
    });

    // Replace the read function with our mock
    (sink as any)(mockRead);

    // Call abort with a function as first argument
    (sink as any).abort(() => {});

    // Verify the mock was called with correct arguments
    expect(mockRead).toHaveBeenCalled();
    const [abortArg] = mockRead.mock.calls[0];
    expect(abortArg).toBe(true);
  });
});