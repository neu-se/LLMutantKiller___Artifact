import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
  it('should correctly filter stack traces', () => {
    const lines = ["line1", "line2", "line3"];
    const filteredLines = Q.filterStackString(lines.join("\n"));

    expect(filteredLines).toEqual(lines.join("\n"));
  });
});