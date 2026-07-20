import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should handle mutation in drain function', (done) => {
    const readCount = 5;
    let count = 0;

    const source = (read: (abort: any, cb: (end: any, data: any) => void) => void) => {
      let i = 0;
      read(null, (end: any, data: any) => {
        if (end) return done();
        count++;
        if (i < readCount - 1) {
          read(null, (end: any, data: any) => {
            if (end) return done();
            count++;
            if (i + 1 < readCount - 1) {
              read(null, (end: any, data: any) => {
                if (end) return done();
                count++;
                if (i + 2 < readCount - 1) {
                  read(null, (end: any, data: any) => {
                    if (end) return done();
                    count++;
                    if (i + 3 < readCount - 1) {
                      read(null, (end: any, data: any) => {
                        if (end) return done();
                        count++;
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    };

    const drainStream = drain(
      () => {
        return true;
      },
      () => {
        expect(count).toBe(readCount);
        done();
      }
    );

    source(drainStream);
  });
});