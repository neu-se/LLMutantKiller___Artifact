import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";
import { Readable } from "stream";

describe("find sink", () => {
  it("should call the callback with the found item when test is a function", (done) => {
    const testFn = (data: any) => data.value === 42;
    const cb = (err: Error | null, data: any) => {
      expect(err).toBeNull();
      expect(data).toEqual({ value: 42 });
      done();
    };

    const source = Readable.from([
      { value: 10 },
      { value: 20 },
      { value: 42 },
      { value: 30 }
    ]);

    source.pipe(find(testFn, cb));
  });
});