import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should call the done callback when the stream ends', () => {
    const doneCallback = jest.fn();
    const read = () => {};
    const sink = drain(() => true, doneCallback);
    sink(read);
    expect(read).toHaveBeenCalledTimes(1);
  });
});