import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should create error with descriptive message when no done callback is provided', () => {
    // Create drain without done callback
    const sink = drain(null, undefined);

    // Access the internal error object that was created
    // This tests the actual mutation point where the error message is set
    const error = (sink as any).doneLackingErr;

    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('no done callback supplied');
  });
});