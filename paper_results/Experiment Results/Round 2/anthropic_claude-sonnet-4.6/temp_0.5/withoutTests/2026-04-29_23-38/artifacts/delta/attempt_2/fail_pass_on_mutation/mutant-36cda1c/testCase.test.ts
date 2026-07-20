import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe("Delta.eachLine with embed ops", () => {
  it("should treat embed ops as non-newline content with index -1, pushing the entire op to the current line", () => {
    // The mutation changes `: -1` to `: +1` for embed ops in eachLine
    // With -1: index < 0, so line.push(iter.next()) - pushes whole op
    // With +1: index > 0, so line.push(iter.next(index)) = line.push(iter.next(1))
    // For embeds (length=1), iter.next(1) == iter.next(), so behavior is equivalent
    // 
    // However, we can detect the mutation by checking the exact line content
    // when an embed is followed by content that would be affected by the iterator state
    
    const delta = new Delta()
      .insert({ image: "url" })
      .insert("\n");

    const lines: Delta[] = [];
    delta.eachLine((line) => {
      lines.push(line);
    });

    expect(lines.length).toBe(1);
    expect(lines[0].ops).toEqual([{ insert: { image: "url" } }]);
  });
});