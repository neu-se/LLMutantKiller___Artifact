import { async } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("async generator with exception handling", () => {
  it("should properly handle exceptions thrown in SpiderMonkey generators", async () => {
    // Create a generator that throws an exception
    const makeGenerator = function* () {
      yield 1;
      throw new Error("Test error");
    };

    // Wrap it with async
    const asyncFn = async(makeGenerator);

    // Execute and expect rejection
    await expect(asyncFn()).rejects.toThrow("Test error");
  });
});