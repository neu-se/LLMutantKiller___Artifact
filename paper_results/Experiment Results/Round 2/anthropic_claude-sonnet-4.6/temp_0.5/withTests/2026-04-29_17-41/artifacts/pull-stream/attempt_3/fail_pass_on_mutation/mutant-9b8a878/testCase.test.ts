import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull", () => {
  it("partial sink called once should work and called twice should throw", () => {
    const through = (read: Function) => (abort: any, cb: Function) => read(abort, cb);
    
    const partial = pull(through);
    
    let i = 0;
    const source = (abort: any, cb: Function) => {
      if (abort || i > 2) return cb(true);
      cb(null, i++);
    };
    
    // First call should work
    const read = partial(source);
    expect(typeof read).toBe("function");
    
    // Second call should throw TypeError
    expect(() => {
      partial(source);
    }).toThrow(TypeError);
  });
});