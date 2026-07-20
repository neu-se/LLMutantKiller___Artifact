import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull", () => {
  it("should throw TypeError when partial sink is called a second time", () => {
    const through = (read: Function) => (abort: any, cb: Function) => read(abort, cb);
    const sink = (_read: Function) => {};

    const partialSink = pull(through, through, through, through, sink);
    const source = (_abort: any, cb: Function) => cb(true);
    
    partialSink(source);
    
    expect(() => partialSink(source)).toThrow(TypeError);
  });
});