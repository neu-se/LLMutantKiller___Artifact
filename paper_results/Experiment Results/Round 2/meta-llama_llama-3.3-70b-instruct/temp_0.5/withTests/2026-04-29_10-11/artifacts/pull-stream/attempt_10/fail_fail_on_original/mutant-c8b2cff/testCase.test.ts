import { drain } from '../../../sinks/drain.js';

describe('drain', () => {
  it('should call done with the correct abort value', () => {
    const done = jest.fn();
    const op = () => false;
    const sink = drain(op, done);
    const read = (err: any, cb: (err: any, data: any) => void) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, 'data');
      }
    };
    sink(read);
    const abort = true;
    sink(abort, () => {});
    expect(done).toHaveBeenCalledTimes(1);
    expect(done).toHaveBeenCalledWith(expect.objectContaining({ abort: true }));
  });
});