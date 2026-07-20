// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/pull-stream/attempt_1/pending_category/mutant-9e28478/testCase.test.ts
import { pull } from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull function with two arguments", () => {
  it("should correctly handle partial application with two arguments", (done) => {
    const mockRead = jest.fn((end, cb) => {
      if (end) {
        cb(end);
      } else {
        cb(null, "test-data");
      }
    });

    const mockSink1 = jest.fn((read) => {
      return (end, cb) => {
        read(end, (err, data) => {
          if (err) cb(err);
          else cb(null, data);
        });
      };
    });

    const mockSink2 = jest.fn((read) => {
      return (end, cb) => {
        read(end, (err, data) => {
          if (err) cb(err);
          else cb(null, data);
        });
      };
    });

    const partialSink = pull(mockSink1, mockSink2);
    const result = partialSink(mockRead);

    result(null, (end, data) => {
      expect(mockSink1).toHaveBeenCalled();
      expect(mockSink2).toHaveBeenCalled();
      expect(data).toBe("test-data");
      done();
    });
  });
});