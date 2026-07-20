import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("should correctly handle partial application with multiple through streams", () => {
    // Test that partial application works correctly
    // The mutation changes new Array(length) to new Array()
    // This affects how args array is initialized before being filled
    
    function values(arr: number[]) {
      let i = 0;
      return function(end: any, cb: Function) {
        if (end) return cb(end);
        if (i >= arr.length) return cb(true);
        cb(null, arr[i++]);
      };
    }

    function map(fn: (x: number) => number) {
      return function(read: Function) {
        return function(end: any, cb: Function) {
          read(end, function(end: any, data: any) {
            if (end) return cb(end);
            cb(null, fn(data));
          });
        };
      };
    }

    // Test with exactly 4 through streams (case 4 in switch)
    const partial = pull(
      map(x => x * 2),
      map(x => x + 3),
      map(x => x * 4),
      map(x => x - 1)
    );

    const results: number[] = [];
    const stream = partial(values([1, 2, 3]));

    function drain(read: Function) {
      read(null, function(end: any, data: any) {
        if (end === true) return;
        if (end) throw end;
        results.push(data);
        drain(read);
      });
    }

    drain(stream);
    // 1: 1*2=2, 2+3=5, 5*4=20, 20-1=19
    // 2: 2*2=4, 4+3=7, 7*4=28, 28-1=27
    // 3: 3*2=6, 6+3=9, 9*4=36, 36-1=35
    expect(results).toEqual([19, 27, 35]);
  });
});