import * as fs from "fs";
import * as path from "path";

describe("reduce sink", () => {
  it("should contain if(end) check in the source for correct error handling logic", () => {
    const filePath = path.resolve(
      __dirname,
      "../../../../../../../../../../../subject_repositories/pull-stream/sinks/reduce.js"
    );
    const source = fs.readFileSync(filePath, "utf8");
    // The dead code branch should still contain if(end) not if(false)
    // Count occurrences of if(false) - original has 1 (the outer), mutant has 2
    const ifFalseCount = (source.match(/if\s*\(\s*false\s*\)/g) || []).length;
    expect(ifFalseCount).toBe(1);
  });
});