import { flatten } from "../../../../../../../../../../../subject_repositories/pull-stream/throughs/flatten.js";
import { Readable } from "stream";

describe("flatten mutation test", () => {
  it("should handle abort with error correctly", (done) => {
    const error = new Error("test error");
    const abortCalled = { value: false };
    const readCalledWithError = { value: false };

    const mockRead = (abort, cb) => {
      if (abort) {
        abortCalled.value = true;
        if (abort === error) {
          readCalledWithError.value = true;
        }
        cb(null);
      } else {
        cb(true);
      }
    };

    const flattenStream = flatten()(mockRead);

    flattenStream(error, (err) => {
      expect(abortCalled.value).toBe(true);
      expect(readCalledWithError.value).toBe(true);
      done();
    });
  });
});