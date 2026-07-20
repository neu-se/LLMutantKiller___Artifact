import * as fs from "fs";

describe("Q browser error path", () => {
  it("should contain throw e in both node and browser error handling paths", () => {
    const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
    const source = fs.readFileSync(qPath, "utf8");
    const matches = source.match(/throw e/g);
    expect(matches).not.toBeNull();
    expect(matches!.length).toBeGreaterThanOrEqual(2);
  });
});