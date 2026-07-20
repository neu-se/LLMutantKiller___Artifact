import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull function with 3 arguments", () => {
  it("should correctly handle the case with 3 arguments in the curried function", (done) => {
    const input = [1, 2, 3];
    const expectedOutput = [2, 4, 6];

    // Create a simple source function
    function source(end: any, cb: (end: any, data?: any) => void) {
      let i = 0;
      if (end) return cb(end);
      if (i < input.length) {
        cb(null, input[i++]);
      } else {
        cb(true);
      }
    }

    // Create simple map functions
    function map1(read: any) {
      return function(end: any, cb: (end: any, data?: any) => void) {
        read(end, (end: any, data: any) => {
          if (end) return cb(end);
          cb(null, data * 2);
        });
      };
    }

    function map2(read: any) {
      return function(end: any, cb: (end: any, data?: any) => void) {
        read(end, (end: any, data: any) => {
          if (end) return cb(end);
          cb(null, data);
        });
      };
    }

    function map3(read: any) {
      return function(end: any, cb: (end: any, data?: any) => void) {
        read(end, (end: any, data: any) => {
          if (end) return cb(end);
          cb(null, data);
        });
      };
    }

    // Create a simple collect function
    function collect(read: any, callback: (err: any, result: any[]) => void) {
      const result: number[] = [];
      function next(end: any, data: any) {
        if (end) {
          if (end === true) {
            callback(null, result);
          } else {
            callback(end);
          }
        } else {
          result.push(data);
          read(null, next);
        }
      }
      read(null, next);
    }

    pull(
      source,
      pull(map1, map2, map3),
      collect,
      (err: any, result: number[]) => {
        expect(err).toBeNull();
        expect(result).toEqual(expectedOutput);
        done();
      }
    );
  });
});