import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should call done with error when end is not true', () => {
    const done = jest.fn();
    const op = () => {};
    const sink = drain(op, done);
    const read = () => {
      sink(null, (end, data) => {
        if (end && end !== true) {
          expect(done).toHaveBeenCalledTimes(1);
          expect(done).toHaveBeenCalledWith(end);
        }
      });
    };
    read();
    read({ foo: 'bar' });
  });
});