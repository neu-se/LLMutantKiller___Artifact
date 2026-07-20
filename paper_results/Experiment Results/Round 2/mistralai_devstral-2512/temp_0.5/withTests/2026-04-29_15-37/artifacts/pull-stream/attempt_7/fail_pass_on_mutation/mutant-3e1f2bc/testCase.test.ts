import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull stream mutation test", () => {
  it("should correctly handle object arguments in pull chain", () => {
    // Create a simple source stream
    const source = (read: any) => {
      let i = 0;
      const data = [1, 2, 3];
      return function (abort: any, cb: any) {
        if (abort) {
          cb(abort);
        } else if (i >= data.length) {
          cb(true);
        } else {
          cb(null, data[i++]);
        }
      };
    };

    // Create an object with both source and sink methods
    const objStream = {
      source: source,
      sink: (read: any) => {
        return function (abort: any, cb: any) {
          if (abort) {
            cb(abort);
          } else {
            read(null, function next(end: any, chunk: any) {
              if (end) {
                cb(end);
              } else {
                read(null, next);
              }
            });
          }
        };
      }
    };

    // Test that pull correctly handles the object stream
    const result = pull(objStream);

    // The result should be a function (the read function)
    expect(typeof result).toBe('function');

    // Test that we can call the read function
    const collected: number[] = [];
    result(null, function next(end: any, chunk: any) {
      if (end) {
        expect(collected).toEqual([1, 2, 3]);
      } else {
        collected.push(chunk);
        result(null, next);
      }
    });
  });
});