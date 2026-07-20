import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with source property', () => {
  it('should use read.source when available', (done) => {
    const sourceData = [1, 2, 3];
    let sourceIndex = 0;
    const read = {
      source: () => {
        let index = 0;
        return (abort: any, cb: (end: any, data?: any) => void) => {
          if (abort) {
            cb(abort);
          } else if (index >= sourceData.length) {
            cb(true);
          } else {
            cb(null, sourceData[index++]);
          }
        };
      }
    };

    const result: number[] = [];
    const drain = (abort: any, cb: (end: any, data?: any) => void) => {
      if (abort) {
        cb(abort);
      } else {
        pull(
          read,
          (read: any) => {
            return (abort: any, cb: (end: any, data?: any) => void) => {
              read(abort, (end: any, data: any) => {
                if (end) {
                  cb(end);
                } else {
                  result.push(data);
                  cb(null);
                }
              });
            };
          },
          (read: any) => {
            return (abort: any, cb: (end: any) => void) => {
              read(abort, (end: any) => {
                try {
                  expect(result).toEqual([1, 2, 3]);
                  done();
                } catch (e) {
                  done(e);
                }
                cb(end);
              });
            };
          }
        );
        cb(null);
      }
    };

    pull(drain);
  });
});