import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should handle mutation in drain function', (done) => {
    const readCount = 5;
    let count = 0;

    const source = () => {
      let i = 0;
      return (abort: any, cb: (end: any, data: any) => void) => {
        if (abort) return cb(abort, null);
        if (i >= readCount) return cb(true, null);
        cb(null, i++);
      };
    };

    const drainStream = drain(
      () => {
        count++;
        return true;
      },
      () => {
        expect(count).toBe(readCount);
        done();
      }
    );

    const read = drainStream(source());

    read(null, () => {
      read(null, () => {
        read(null, () => {
          read(null, () => {
            read(null, () => {
              read(null, () => {});
            });
          });
        });
      });
    });
  });
});