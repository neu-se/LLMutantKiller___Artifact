const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.async generator handling", () => {
  it("should correctly handle ES6 generators with return values", async () => {
    // Create a simple generator function that returns a value
    function* simpleGenerator() {
      yield 1;
      yield 2;
      return "final result";
    }

    // Wrap it with Q.async
    const asyncFn = Q.async(simpleGenerator);

    // Execute the async function
    const result = await asyncFn();

    // The result should be the return value of the generator
    expect(result).toBe("final result");
  });
});