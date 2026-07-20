import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should call read with abort and callback only when read is defined', () => {
    const readSpy = jest.fn();
    const sink = drain(null, null);
    sink(readSpy);
    sink.abort(true, jest.fn());
    expect(readSpy).toHaveBeenCalledTimes(1);

    const sink2 = drain(null, null);
    sink2.abort(true, jest.fn());
    expect(readSpy).toHaveBeenCalledTimes(1);
  });
});