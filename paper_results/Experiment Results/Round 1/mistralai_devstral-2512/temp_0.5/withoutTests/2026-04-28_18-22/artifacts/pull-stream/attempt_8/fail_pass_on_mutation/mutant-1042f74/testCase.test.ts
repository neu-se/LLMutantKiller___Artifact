import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink", () => {
  it("should process data in correct order with synchronous source", (done) => {
    const data = ["a", "b", "c"];
    let index = 0;

    const source = (abort: any, cb: (end: boolean | Error, data?: string) => void) => {
      if (index < data.length) {
        cb(false, data[index++]);
      } else {
        cb(true);
      }
    };

    const received: string[] = [];
    const sink = drain((chunk: string) => {
      received.push(chunk);
      return true;
    }, (err: Error | null) => {
      expect(err).toBeNull();
      expect(received).toEqual(data);
      done();
    });

    sink(source);
  });
});