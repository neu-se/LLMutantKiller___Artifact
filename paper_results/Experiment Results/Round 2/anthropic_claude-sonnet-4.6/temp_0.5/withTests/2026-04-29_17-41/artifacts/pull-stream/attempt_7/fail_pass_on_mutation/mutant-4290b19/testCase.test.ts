import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull", () => {
  it("should not pass undefined as a stream argument in the default switch case", (done) => {
    const through = (read: Function) => (abort: any, cb: Function) => read(abort, cb);
    
    // This sink, when called with undefined as read, will throw
    const strictSink = (read: Function) => {
      if (read === undefined) throw new Error("read is undefined");
      const next = () => read(null, (end: any) => { if (!end) next(); else done(); });
      next();
    };

    // 5 args: default case. With mutation, undefined is appended to ref.
    // After ref.unshift(source), pull is called with extra undefined at end.
    // In pull's loop, undefined is processed but ignored since it's not a function/object.
    // strictSink already consumed the stream, so read=undefined when undefined arg is processed.
    // Actually undefined arg is skipped entirely...
    
    // Different approach: make the LAST through return undefined if called with undefined
    const throughOrThrow = (read: Function) => {
      if (typeof read !== 'function') throw new Error(`Expected function, got ${typeof read}`);
      return (abort: any, cb: Function) => read(abort, cb);
    };

    const partialSink = pull(through, through, through, throughOrThrow, strictSink);

    let i = 0;
    const source = (abort: any, cb: Function) => {
      if (abort) { cb(abort); return; }
      if (i++ >= 2) { cb(true); return; }
      cb(null, i);
    };

    expect(() => partialSink(source)).not.toThrow();
  });
});