import drain from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/drain.js";

describe("drain sink", () => {
  it("should handle synchronous data processing with multiple chunks", (done) => {
    const data = ["first", "second", "third"];
    let index = 0;

    const source = (abort: any, cb: (end: boolean | Error, data?: string) => void) => {
      if (index < data.length) {
        cb(false, data[index++]);
      } else {
        cb(true);
      }
    };

    const results: string[] = [];
    const sink = drain((chunk: string) => {
      results.push(chunk);
      return true;
    }, (err: Error | null) => {
      expect(err).toBeNull();
      expect(results).toEqual(data);
      expect(index).toBe(data.length);
      done();
    });

    sink(source);
  });
});