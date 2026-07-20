import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull", () => {
  it("partial pipeline with single through should work correctly when piped", (done) => {
    let callCount = 0;
    const through = (read: Function) => (abort: any, cb: Function) => {
      callCount++;
      read(abort, cb);
    };

    const pipeline = pull(through);
    expect(typeof pipeline).toBe("function");

    let i = 0;
    const values = [1, 2, 3];
    const source = (abort: any, cb: Function) => {
      if (abort || i >= values.length) return cb(true);
      cb(null, values[i++]);
    };

    const collected: number[] = [];
    const read = pipeline(source);
    
    function drain(end: any, data: number) {
      if (end) {
        expect(collected).toEqual([1, 2, 3]);
        expect(callCount).toBeGreaterThan(0);
        done();
        return;
      }
      collected.push(data);
      read(null, drain);
    }
    read(null, drain);
  });
});