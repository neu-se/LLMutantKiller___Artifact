import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
  it("should capture the line number correctly when hasStacks is true", () => {
    var hasStacksBackup = Q.hasStacks;
    Q.hasStacks = true;
    var qStartingLine = Q.captureLine();
    expect(qStartingLine).toBeGreaterThan(0);
    Q.hasStacks = hasStacksBackup;
  });
});