import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should call the done callback when the stream ends', () => {
    const doneCallback = jest.fn();
    const sink = drain(() => true, doneCallback);
    sink(null, () => {});
    expect(doneCallback).toHaveBeenCalledTimes(1);
  });
});