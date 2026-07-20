import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink", () => {
  it("should process synchronous stream correctly with immediate callbacks", (done) => {
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
      expect(index).toBe(data.length);
      done();
    });

    sink(source);
  });
});