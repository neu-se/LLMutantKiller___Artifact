import find from "../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js";
import { Readable } from "stream";

describe("find sink mutation test", () => {
  it("should handle error callback correctly when stream ends without match", (done) => {
    const testStream = Readable.from([1, 2, 3]);
    const testCondition = (x: number) => x > 10;
    const errorToPass = new Error("Test error");

    find(testCondition, (err: Error | null, result: number | null) => {
      try {
        expect(err).toBe(errorToPass);
        expect(result).toBeNull();
        done();
      } catch (assertionError) {
        done(assertionError);
      }
    })(testStream);

    // Simulate an error in the stream
    process.nextTick(() => {
      testStream.emit("error", errorToPass);
    });
  });
});