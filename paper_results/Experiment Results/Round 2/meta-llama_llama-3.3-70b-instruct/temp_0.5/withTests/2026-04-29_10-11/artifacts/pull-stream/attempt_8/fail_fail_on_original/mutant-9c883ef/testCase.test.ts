import find from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js';

describe('find function', () => {
  it('should call the callback with the first matching element', () => {
    const test = (d: any) => d === 7;
    const cb = jest.fn();
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const read = () => {
      let i = 0;
      return (end: any, cb: any) => {
        if (end) return cb(end);
        if (i >= values.length) return cb(true);
        cb(null, values[i++]);
      };
    };
    find(test, cb)(read);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, 7);
  });

  it('should not call the callback when no matching element is found', () => {
    const test = (d: any) => d === 11;
    const cb = jest.fn();
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const read = () => {
      let i = 0;
      return (end: any, cb: any) => {
        if (end) return cb(end);
        if (i >= values.length) return cb(true);
        cb(null, values[i++]);
      };
    };
    find(test, cb)(read);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, null);
  });
});