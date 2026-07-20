import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink", () => {
  it("should process multiple data chunks before ending", (done) => {
    let calls = 0;
    const source = (abort: any, cb: (end: boolean | Error, data?: string) => void) => {
      if (calls === 0) {
        calls++;
        cb(false, "first");
      } else if (calls === 1) {
        calls++;
        cb(false, "second");
      } else {
        cb(true);
      }
    };

    const processed: string[] = [];
    const sink = drain((data: string) => {
      processed.push(data);
      return true;
    }, (err: Error | null) => {
      expect(err).toBeNull();
      expect(processed).toEqual(["first", "second"]);
      done();
    });

    sink(source);
  });
});