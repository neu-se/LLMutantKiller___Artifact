import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with partial application', () => {
  it('should correctly handle partial application with multiple arguments', (done) => {
    // Create a simple source function
    const source = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) return cb(abort);
      let i = 0;
      const values = [1, 2, 3];
      if (i < values.length) {
        cb(null, values[i++]);
      } else {
        cb(true);
      }
    };

    // Create a simple map function
    const map = (read: (abort: any, cb: (end: any, data?: any) => void) => void) => {
      return (abort: any, cb: (end: any, data?: any) => void) => {
        read(abort, (end: any, data: any) => {
          if (end) return cb(end);
          cb(null, data * 2);
        });
      };
    };

    // Create a simple take function
    const take = (count: number) => {
      return (read: (abort: any, cb: (end: any, data?: any) => void) => void) => {
        let taken = 0;
        return (abort: any, cb: (end: any, data?: any) => void) => {
          if (taken >= count) return cb(true);
          read(abort, (end: any, data: any) => {
            if (end) return cb(end);
            taken++;
            cb(null, data);
          });
        };
      };
    };

    // Create a simple collect function
    const collect = (cb: (err: any, result: any[]) => void) => {
      const results: any[] = [];
      return (end: any, data: any) => {
        if (end) {
          if (end !== true) return cb(end);
          return cb(null, results);
        }
        results.push(data);
      };
    };

    // Create a partially applied pull function with multiple arguments
    const partialPull = pull(source, map, take(2));

    // The partialPull should be a function that can be called with a read function
    const read = partialPull(collect((err: any, result: number[]) => {
      expect(err).toBeNull();
      expect(result).toEqual([2, 4]);
      done();
    }));

    // Trigger the read
    read(null, () => {});
  });
});