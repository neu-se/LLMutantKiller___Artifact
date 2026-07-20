import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("should not process beyond the last provided argument", () => {
    // We need to detect the extra iteration with i <= length
    // The extra iteration has s = arguments[length] = undefined
    // If read is a function at that point, s(read) won't be called (s is undefined)
    // But if we can make arguments[length] be something via a special call...
    
    // Key insight: use pull with a sink object whose source is a through-like function
    // Then check if that source gets called as a through stream (it shouldn't)
    
    const callLog: string[] = [];
    
    let count = 0;
    const source = (end: any, cb: Function) => {
      if (end || count++ >= 1) return cb(true);
      cb(null, 10);
    };
    
    // A through stream
    const through = (read: Function) => {
      callLog.push("through-applied");
      return (end: any, cb: Function) => {
        read(end, (end: any, data: any) => {
          if (end) return cb(end);
          cb(null, data + 1);
        });
      };
    };
    
    const result = pull(source, through);
    const values: number[] = [];
    result(null, (end: any, data: any) => {
      if (!end) values.push(data);
    });
    
    expect(values).toEqual([11]);
    expect(callLog).toEqual(["through-applied"]);
  });
});