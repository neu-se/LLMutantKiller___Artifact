import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull partial application args array length", () => {
  it("should correctly pipe through 5 transforms using partial application default case", (done) => {
    const makeAdder = (n: number) => (read: Function) => (abort: any, cb: Function) => {
      read(abort, (end: any, data: any) => {
        if (end) return cb(end);
        cb(null, data + n);
      });
    };

    // 5 arguments triggers the default switch case which uses ref.unshift(read)
    // The args array must have exactly 5 elements for this to work correctly
    const pipeline = pull(makeAdder(1), makeAdder(2), makeAdder(3), makeAdder(4), makeAdder(5));

    let i = 0;
    const values = [10];
    const source = (abort: any, cb: Function) => {
      if (abort || i >= values.length) return cb(true);
      cb(null, values[i++]);
    };

    const read = pipeline(source);
    read(null, (end: any, data: any) => {
      expect(data).toBe(25); // 10+1+2+3+4+5 = 25
      read(null, (end2: any) => {
        expect(end2).toBeTruthy();
        done();
      });
    });
  });
});