// Test case to detect the mutation in the async function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("async function mutation detection", () => {
  it("should correctly handle ES6 generators with StopIteration", async () => {
    // This test specifically targets the mutation by creating a scenario
    // where StopIteration would be defined in SpiderMonkey but not in ES6
    const testGenerator = function* () {
      yield Q(10);
      return 15;
    };

    // In the original code, this would use the ES6 generator path
    // In the mutated code, it would incorrectly use the SpiderMonkey path
    const result = await Q.async(testGenerator)();

    expect(result).toBe(15);
  });
});