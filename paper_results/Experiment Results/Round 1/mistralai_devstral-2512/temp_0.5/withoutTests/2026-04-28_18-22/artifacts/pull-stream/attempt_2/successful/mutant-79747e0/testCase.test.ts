import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain sink', () => {
  it('should not call done callback when no done callback is provided', () => {
    const mockSource = jest.fn((abort: any, cb: (end: any, data?: any) => void) => {
      cb(true); // End the stream
    });

    const sink = drain(null, undefined);
    sink(mockSource);

    expect(mockSource).toHaveBeenCalled();
  });
});