import { drain } from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should call the abort callback when sink.abort is called', (done) => {
    const sink = drain(null, () => {});
    const abortCallback = jest.fn();
    sink.abort(abortCallback);
    process.nextTick(() => {
      expect(abortCallback).toHaveBeenCalledTimes(1);
      done();
    });
  });
});