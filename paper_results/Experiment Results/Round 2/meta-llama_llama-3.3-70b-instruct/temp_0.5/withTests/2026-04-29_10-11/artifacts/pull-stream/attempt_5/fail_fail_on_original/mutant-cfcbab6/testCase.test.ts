import { pull } from '../../../../../../../../subject_repositories/pull-stream/pull.js';

describe('pull function', () => {
  it('should pass with the original code and fail with the mutated code', () => {
    const values = [1, 2, 3, 4, 5];
    const read = pull(
      pull.values(values),
      (read: any) => {
        return function (end: any, cb: any) {
          if (end === true) cb(end);
          else if (end) cb(end);
          else read(end, cb);
        };
      },
      (read: any) => {
        return function (end: any, cb: any) {
          if (end === true) cb(end);
          else if (end) cb(end);
          else read(end, cb);
        };
      }
    );

    const result: any[] = [];
    read(null, (end: any, data: any) => {
      if (end) return;
      result.push(data);
    });
    read(null, (end: any, data: any) => {
      if (end) return;
      result.push(data);
    });
    read(null, (end: any, data: any) => {
      if (end) return;
      result.push(data);
    });
    read(null, (end: any, data: any) => {
      if (end) return;
      result.push(data);
    });
    read(null, (end: any, data: any) => {
      if (end) return;
      result.push(data);
    });

    expect(result.length).toBe(5);
  });
});