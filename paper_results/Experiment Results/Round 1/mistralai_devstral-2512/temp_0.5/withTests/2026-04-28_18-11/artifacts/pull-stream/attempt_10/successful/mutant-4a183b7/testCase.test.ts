import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe('pull function with source property', () => {
  it('should use read.source when available', () => {
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
    const collector = (read: any) => {
      return (abort: any, cb: (end: any) => void) => {
        read(abort, (end: any, data: any) => {
          if (end) {
            cb(end);
          } else {
            result.push(data);
            read(null, (end: any, data: any) => {
              if (end) {
                cb(end);
              } else {
                result.push(data);
                read(null, (end: any, data: any) => {
                  if (end) {
                    cb(end);
                  } else {
                    result.push(data);
                    cb(null);
                  }
                });
              }
            });
          }
        });
      };
    };

    const finalRead = pull(read, collector);
    finalRead(null, (end: any) => {
      expect(result).toEqual([1, 2, 3]);
    });
  });
});