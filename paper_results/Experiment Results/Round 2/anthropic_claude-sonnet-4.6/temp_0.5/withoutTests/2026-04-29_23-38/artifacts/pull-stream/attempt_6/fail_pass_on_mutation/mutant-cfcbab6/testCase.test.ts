import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("should handle partial application with 5 through streams via default case", () => {
    const applied: number[] = [];
    let count = 0;
    
    const source = (end: any, cb: Function) => {
      if (end || count++ >= 1) return cb(true);
      cb(null, 0);
    };
    
    const makeThrough = (n: number) => (read: Function) => {
      applied.push(n);
      return (end: any, cb: Function) => {
        read(end, (end: any, data: any) => {
          if (end) return cb(end);
          cb(null, data + n);
        });
      };
    };
    
    // 5 through streams triggers the `default` case in the switch
    const partial = pull(
      makeThrough(1),
      makeThrough(2),
      makeThrough(3),
      makeThrough(4),
      makeThrough(5)
    );
    
    const result = partial(source);
    const values: number[] = [];
    result(null, (end: any, data: any) => {
      if (!end) values.push(data);
    });
    
    // 0 + 1 + 2 + 3 + 4 + 5 = 15
    expect(values).toEqual([15]);
    // Each through applied exactly once
    expect(applied).toEqual([1, 2, 3, 4, 5]);
  });
});