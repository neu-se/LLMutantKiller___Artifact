import { find } from '../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js';

describe('find function', () => {
  it('should return the first matching element', () => {
    const data = [1, 2, 3, 4, 5];
    const test = (d: number) => d === 3;
    const cb = jest.fn();
    find(test, cb);
    const read = (end: boolean, cb: (end: boolean, data: number) => void) => {
      if (end) return cb(end);
      cb(null, data.shift());
    };
    read(false, (end, d) => {
      if (end) return;
      read(false, (end, d) => {
        if (end) return;
        read(false, (end, d) => {
          if (end) return;
          read(false, (end, d) => {
            if (end) return;
            read(false, (end, d) => {
              if (end) return;
              expect(cb).toHaveBeenCalledTimes(1);
              expect(cb).toHaveBeenCalledWith(null, 3);
            });
          });
        });
      });
    });
  });

  it('should handle error when err is not true', () => {
    const data = [1, 2, 3, 4, 5];
    const test = (d: number) => d === 3;
    const cb = jest.fn();
    find(test, cb);
    const read = (end: boolean, cb: (end: boolean, data: number) => void) => {
      if (end) return cb(end);
      cb(null, data.shift());
    };
    read(false, (end, d) => {
      if (end) return;
      read(false, (end, d) => {
        if (end) return;
        read(false, (end, d) => {
          if (end) return;
          read(false, (end, d) => {
            if (end) return;
            read(true, (end, d) => {
              expect(cb).toHaveBeenCalledTimes(1);
              expect(cb).toHaveBeenCalledWith(null, 3);
            });
          });
        });
      });
    });
  });

  it('should handle error when err is true', () => {
    const data = [1, 2, 3, 4, 5];
    const test = (d: number) => d === 3;
    const cb = jest.fn();
    find(test, cb);
    const read = (end: boolean, cb: (end: boolean, data: number) => void) => {
      if (end) return cb(end);
      cb(null, data.shift());
    };
    read(false, (end, d) => {
      if (end) return;
      read(false, (end, d) => {
        if (end) return;
        read(false, (end, d) => {
          if (end) return;
          read(false, (end, d) => {
            if (end) return;
            read(true, (end, d) => {
              expect(cb).toHaveBeenCalledTimes(1);
              expect(cb).toHaveBeenCalledWith(null, 3);
            });
          });
        });
      });
    });
  });
});