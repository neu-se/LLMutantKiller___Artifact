import { drain } from '../../../../../../../../subject_repositories/pull-stream/sinks/drain.js';

describe('drain', () => {
  it('should call done with the correct abort value', () => {
    const done = jest.fn();
    const op = () => false;
    const sink = drain(op, done);
    const read = jest.fn();
    sink(read);
    sink(true, () => {});
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(true);
  });
});