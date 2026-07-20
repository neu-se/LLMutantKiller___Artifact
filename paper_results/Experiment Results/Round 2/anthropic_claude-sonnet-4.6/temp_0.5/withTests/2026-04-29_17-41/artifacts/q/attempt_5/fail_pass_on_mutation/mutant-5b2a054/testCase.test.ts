import Q from "../../../../../../../../../../../subject_repositories/q/q.js";
import * as fs from "fs";
import * as path from "path";

describe("Q internal error handling", () => {
  it("should contain error rethrowing in the flush mechanism", () => {
    const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    const source = fs.readFileSync(qPath, "utf8");
    // The flush mechanism must rethrow errors to ensure they are not silently swallowed
    // Count occurrences of "throw e" - original has it in both if and else branches
    const throwCount = (source.match(/throw e/g) || []).length;
    expect(throwCount).toBeGreaterThanOrEqual(2);
  });
});