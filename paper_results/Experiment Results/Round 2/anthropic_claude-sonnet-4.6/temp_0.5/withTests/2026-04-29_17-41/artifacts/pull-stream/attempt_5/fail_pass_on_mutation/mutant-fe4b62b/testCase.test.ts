import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink.abort", () => {
  it("calls done with null when stream ends normally", (done) => {
    let i = 0;
    const values = [1, 2, 3];
    
    const source = (abort: any, cb: Function) => {
      if (abort) { cb(abort); return; }
      if (i >= values.length) { cb(true); return; }
      cb(null, values[i++]);
    };

    drain(
      (_data: any) => {},
      (err: any) => {
        expect(err).toBeNull();
        done();
      }
    )(source);
  });
});