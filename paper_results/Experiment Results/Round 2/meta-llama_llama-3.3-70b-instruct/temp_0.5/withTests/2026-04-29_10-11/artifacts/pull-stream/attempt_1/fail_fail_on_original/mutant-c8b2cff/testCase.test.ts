import { drain } from '../../../../../../../../subject_repositories/pull-stream/sinks/drain.js'

describe('drain', () => {
  it('should call done with abort when op returns false and abort is not true', () => {
    const done = jest.fn();
    const op = () => false;
    const sink = drain(op, done);
    sink(null, () => {});
    sink(true, () => {});
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(true);
  });
});