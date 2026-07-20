import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull", () => {
  it("should correctly process pipeline with source object having source property", (done) => {
    const collected: number[] = [];
    
    // Create a through that has .length === 1 (triggers partial branch)
    const addOne = (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end);
        cb(null, data + 1);
      });
    };

    // Verify addOne.length is 1
    expect(addOne.length).toBe(1);

    let i = 0;
    const values = [10, 20, 30];
    
    // Create source with .source property - exercises different branch in pull
    const sourceObj = {
      source: (abort: any, cb: Function) => {
        if (abort || i >= values.length) return cb(true);
        cb(null, values[i++]);
      }
    };

    // pull(addOne) creates partial, then call with sourceObj
    const partial = pull(addOne);
    const read = partial(sourceObj.source);

    function drain() {
      read(null, (end: any, data: any) => {
        if (end) {
          expect(collected).toEqual([11, 21, 31]);
          done();
          return;
        }
        collected.push(data);
        drain();
      });
    }
    drain();
  });
});