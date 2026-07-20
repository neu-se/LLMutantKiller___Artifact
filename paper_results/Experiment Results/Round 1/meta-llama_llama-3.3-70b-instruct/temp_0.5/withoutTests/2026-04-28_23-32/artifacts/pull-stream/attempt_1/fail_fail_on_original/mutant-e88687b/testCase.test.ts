import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should throw an error when err is a function', () => {
    const err = () => {};
    const read = jest.fn();
    const done = jest.fn();
    const sink = drain(null, done);
    sink(read);
    sink.abort(err);
    expect(read).toHaveBeenCalledTimes(1);
    expect(read).toHaveBeenCalledWith(true, expect.any(Function));
  });
});