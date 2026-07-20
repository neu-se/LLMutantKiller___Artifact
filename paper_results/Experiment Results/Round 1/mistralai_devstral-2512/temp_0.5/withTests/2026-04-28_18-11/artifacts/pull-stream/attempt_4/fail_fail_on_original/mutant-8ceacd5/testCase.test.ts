import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull with more than 4 arguments', () => {
  it('should handle more than 4 arguments correctly', (done) => {
    const values = [1, 2, 3, 4, 5];
    let result: number[] = [];

    const source = function (abort: any, cb: any) {
      if (abort) return cb(abort);
      if (values.length === 0) return cb(true);
      cb(null, values.shift());
    };

    const map1 = function (read: any) {
      return function (abort: any, cb: any) {
        read(abort, function (end: any, data: any) {
          if (end) cb(end);
          else cb(null, data * 2);
        });
      };
    };

    const map2 = function (read: any) {
      return function (abort: any, cb: any) {
        read(abort, function (end: any, data: any) {
          if (end) cb(end);
          else cb(null, data + 1);
        });
      };
    };

    const map3 = function (read: any) {
      return function (abort: any, cb: any) {
        read(abort, function (end: any, data: any) {
          if (end) cb(end);
          else cb(null, data - 3);
        });
      };
    };

    const map4 = function (read: any) {
      return function (abort: any, cb: any) {
        read(abort, function (end: any, data: any) {
          if (end) cb(end);
          else cb(null, data * 3);
        });
      };
    };

    const map5 = function (read: any) {
      return function (abort: any, cb: any) {
        read(abort, function (end: any, data: any) {
          if (end) cb(end);
          else cb(null, data / 2);
        });
      };
    };

    const collect = function (read: any) {
      return function (abort: any, cb: any) {
        read(abort, function next(end: any, data: any) {
          if (end) {
            if (end === true) {
              cb(null, result);
            } else {
              cb(end);
            }
          } else {
            result.push(data);
            read(null, next);
          }
        });
      };
    };

    const read = pull(
      source,
      map1,
      map2,
      map3,
      map4,
      map5,
      collect
    );

    read(null, function (err: any, collectedResult: number[]) {
      expect(err).toBeNull();
      expect(collectedResult).toEqual([0, 4.5, 9, 13.5, 18]);
      done();
    });
  });
});