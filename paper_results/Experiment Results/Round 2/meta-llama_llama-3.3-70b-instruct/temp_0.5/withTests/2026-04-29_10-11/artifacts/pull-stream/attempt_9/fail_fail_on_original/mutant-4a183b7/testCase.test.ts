import pull from '../../../../../../../../../../../subject_repositories/pull-stream/pull.js'

describe('pull-stream', () => {
  it('should pass through values when read.source is a function', () => {
    const values = [1, 2, 3];
    const read = {
      source: () => {
        return function (end: any, cb: any) {
          if (end) return cb(end);
          cb(null, values.shift());
        };
      },
    };

    let result: any[] = [];
    pull(
      read,
      pull.collect((err: any, data: any) => {
        if (err) throw err;
        result = data;
        expect(result).toEqual([1, 2, 3]);
      })
    );
  });
});