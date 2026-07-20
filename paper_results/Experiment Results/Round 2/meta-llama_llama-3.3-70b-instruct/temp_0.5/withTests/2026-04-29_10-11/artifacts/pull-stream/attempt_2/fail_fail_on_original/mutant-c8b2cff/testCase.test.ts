import { drain } from '../../../sinks/drain.js';

describe('drain', () => {
  it('should call done with the correct abort value', () => {
    const done = jest.fn();
    const op = () => false;
    const sink = drain(op, done);
    sink(null, () => {});
    sink(abort = true, () => {});
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(true);
  });
});