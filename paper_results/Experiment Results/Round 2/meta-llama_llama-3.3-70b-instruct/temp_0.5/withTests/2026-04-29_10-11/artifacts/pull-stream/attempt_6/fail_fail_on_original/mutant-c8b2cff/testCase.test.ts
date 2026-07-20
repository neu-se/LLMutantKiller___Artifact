import { drain } from '../../../sinks/drain.js';

describe('drain', () => {
  it('should call done with the correct abort value', () => {
    const done = jest.fn();
    const op = () => false;
    const sink = drain(op, done);
    const read = (err, cb) => {
      if (err) {
        cb(err);
      } else {
        cb(null, 'data');
      }
    };
    sink(read);
    sink(true, () => {});
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(true);
  });
});