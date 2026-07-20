import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js"

describe("pull", () => {
  it("should return the composed stream when called with source and through", () => {
    const source = (end: any, cb: Function) => {
      if (end) return cb(end);
      cb(null, 1);
    };
    
    const through = (read: Function) => (end: any, cb: Function) => {
      read(end, (end: any, data: any) => {
        if (end) return cb(end);
        cb(null, data + 1);
      });
    };
    
    const result = pull(source, through);
    
    // result should be through(source), not source itself
    expect(result).not.toBe(source);
    expect(typeof result).toBe("function");
    
    const values: number[] = [];
    result(null, (end: any, data: any) => {
      if (!end) values.push(data);
    });
    
    expect(values).toEqual([2]);
  });
});