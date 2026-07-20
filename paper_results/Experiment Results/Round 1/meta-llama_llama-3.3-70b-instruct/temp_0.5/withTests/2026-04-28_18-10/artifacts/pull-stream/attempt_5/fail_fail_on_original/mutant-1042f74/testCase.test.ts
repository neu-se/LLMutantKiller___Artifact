import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe('drain', () => {
  it('should handle mutation in drain function', () => {
    const readCount = 5;
    let count = 0;

    const done = jest.fn();

    const source = (read: (abort: any, cb: (end: any, data: any) => void) => void) => {
      read(null, () => {
        count++;
        if (count < readCount) {
          read(null, () => {
            count++;
            if (count < readCount) {
              read(null, () => {
                count++;
                if (count < readCount) {
                  read(null, () => {
                    count++;
                    if (count < readCount) {
                      read(null, () => {
                        count++;
                        if (count < readCount) {
                          read(null, () => {
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
        }
      });
    };

    const drainStream = drain(
      () => true,
      done
    );

    source(drainStream);

    expect(count).toBe(readCount);
    expect(done).toHaveBeenCalledTimes(1);
  });
});