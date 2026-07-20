import { async } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("async generator with done property", () => {
  it("should properly handle generator done property in SpiderMonkey", async () => {
    // Create a generator that completes normally
    const makeGenerator = function* () {
      yield 1;
      yield 2;
      return "completed";
    };

    // Wrap it with async
    const asyncFn = async(makeGenerator);

    // Execute and expect resolution with the return value
    await expect(asyncFn()).resolves.toBe("completed");
  });
});