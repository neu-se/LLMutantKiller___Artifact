import * as drainModule from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain function', () => {
  it('should call read with correct abort value when op returns false', (done) => {
    const op = () => false;
    const read = jest.fn();
    const doneCallback = jest.fn();
    const sink = drainModule.default(op, doneCallback);
    sink(read);
    read(null, () => {
      expect(read).toHaveBeenCalledTimes(2);
      expect(read).toHaveBeenNthCalledWith(2, true, expect.any(Function));
      done();
    });
  });
});