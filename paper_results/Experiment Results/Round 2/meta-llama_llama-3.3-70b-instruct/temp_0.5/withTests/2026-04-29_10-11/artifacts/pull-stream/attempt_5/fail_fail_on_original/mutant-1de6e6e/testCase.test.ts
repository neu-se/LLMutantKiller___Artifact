import { reduce } from './reduce';

describe('reduce', () => {
  it('should call callback with accumulated value when stream ends', () => {
    const reducer = (a: number, b: number) => a + b;
    const cb = jest.fn();
    const source = (end: any, cb: any) => {
      if (end) return cb(end);
      cb(null, 1);
      cb(null, 2);
      cb(true);
    };

    const sink = reduce(reducer, 0, cb);
    sink(source);

    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, 3);
  });
});