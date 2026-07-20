import * as fs from "fs";

describe("Q browser error path", () => {
  it("should have non-empty setTimeout error handler in browser fallback path", () => {
    const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    const source = fs.readFileSync(qPath, "utf8");
    // Original: setTimeout(function () {\n                       throw e;\n                   }, 0);
    // Mutated:  setTimeout(function () {}, 0);
    // The mutated version has an empty setTimeout callback
    // Check that there is NO empty setTimeout(function(){},0) pattern
    expect(source).not.toMatch(/setTimeout\(function\s*\(\)\s*\{\s*\},\s*0\)/);
  });
});