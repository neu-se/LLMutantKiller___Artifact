import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";
import pull from "pull-stream";

describe("find sink", () => {
  it("should call the callback with the found item when test is a function", (done) => {
    const testFn = (data: any) => data.value === 42;
    const cb = (err: Error | null, data: any) => {
      expect(err).toBeNull();
      expect(data).toEqual({ value: 42 });
      done();
    };

    const source = pull.values([
      { value: 10 },
      { value: 20 },
      { value: 42 },
      { value: 30 }
    ]);

    pull(
      source,
      find(testFn, cb)
    );
  });
});