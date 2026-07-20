import { find } from '../../sinks/find';

describe('find function', () => {
  it('should call the callback with the first matching element', (done) => {
    const test = (d: any) => d === 7;
    const cb = jest.fn();
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const read = find(test, cb);
    read(null, (end: any, data: any) => {
      if (end) return;
      if (data === 7) return read(true);
      read(null, (end: any, data: any) => {
        if (end) return;
        if (data === 7) return read(true);
        read(null, (end: any, data: any) => {
          if (end) return;
          if (data === 7) return read(true);
          read(null, (end: any, data: any) => {
            if (end) return;
            if (data === 7) return read(true);
            read(null, (end: any, data: any) => {
              if (end) return;
              if (data === 7) return read(true);
              read(null, (end: any, data: any) => {
                if (end) return;
                if (data === 7) return read(true);
                read(null, (end: any, data: any) => {
                  if (end) return;
                  if (data === 7) return read(true);
                  read(null, (end: any, data: any) => {
                    if (end) return;
                    if (data === 7) return read(true);
                    read(null, (end: any, data: any) => {
                      if (end) return;
                      if (data === 7) return read(true);
                      read(null, (end: any, data: any) => {
                        if (end) return;
                        if (data === 7) return read(true);
                        read(null, (end: any, data: any) => {
                          if (end) return;
                          if (data === 7) return read(true);
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null, 7);
    done();
  });
});