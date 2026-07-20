// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/pull-stream/attempt_1/pending_category/mutant-2d57ea8/testCase.test.ts
import { createReadStream } from "fs";
import { join } from "path";
import pull from "../../../../../../../../../../../subject_repositories/pull-stream/pull.js";

describe("pull stream error message validation", () => {
  it("should throw TypeError with descriptive message when partial sink is called twice", (done) => {
    const partialSink = pull((read: any) => {
      // This will be called twice to trigger the error
      partialSink(read);
    });

    const readStream = createReadStream(join(__dirname, "../../../../../../../../../../../subject_repositories/pull-stream/package.json"));

    try {
      pull(
        readStream,
        partialSink
      );
    } catch (error) {
      if (error instanceof TypeError) {
        expect(error.message).toBe("partial sink should only be called once!");
        done();
      } else {
        done(new Error("Expected TypeError with specific message"));
      }
    }
  });
});