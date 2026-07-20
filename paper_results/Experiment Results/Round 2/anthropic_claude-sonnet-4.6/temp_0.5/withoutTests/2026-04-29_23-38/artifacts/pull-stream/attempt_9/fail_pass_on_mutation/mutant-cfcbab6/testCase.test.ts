import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("should compose 5 through streams correctly via partial application default case", () => {
    let count = 0;
    const source = (end: any, cb: Function) => {
      if (end || count++ >= 1) return cb(true);
      cb(null, 1);
    };
    
    // Each through stream has arity 1 (triggers partial application as first arg)
    const addOne = (read: Function) => (end: any, cb: Function) => {
      read(end, (end: any, data: any) => {
        if (end) return cb(end);
        cb(null, data + 1);
      });
    };
    
    // 5 through streams → triggers default case in switch
    // pull(addOne, addOne, addOne, addOne, addOne) → partial application
    // partial(source) → switch(5) default → ref.unshift(source) → pull.apply(null, ref)
    // recursive pull(source, addOne, addOne, addOne, addOne, addOne)
    // source.length = 2, so main path, loop processes 5 addOnes
    const partial = pull(addOne, addOne, addOne, addOne, addOne);
    const result = partial(source);
    
    const values: number[] = [];
    result(null, (end: any, data: any) => {
      if (!end) values.push(data);
    });
    
    // 1 + 5 = 6
    expect(values).toEqual([6]);
  });
});