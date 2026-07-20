import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta eachLine', () => {
  it('should correctly process embed ops in eachLine without treating them as newlines', () => {
    // Create a delta with ONLY an embed - no newlines
    // With original (-1): index < 0, iter.next() called
    // With mutated (+1): index > 0, iter.next(1) called
    // If these differ, the line content will differ
    const delta = new Delta()
      .insert({ image: 'photo' })
      .insert({ video: 'clip' })
      .insert('\n');

    const capturedLines: Delta[] = [];
    const capturedAttrs: object[] = [];
    
    delta.eachLine((line, attrs) => {
      capturedLines.push(line);
      capturedAttrs.push(attrs);
    });

    // Should have exactly 1 line containing both embeds
    expect(capturedLines).toHaveLength(1);
    expect(capturedLines[0].ops).toHaveLength(2);
    expect(capturedLines[0].ops[0]).toEqual({ insert: { image: 'photo' } });
    expect(capturedLines[0].ops[1]).toEqual({ insert: { video: 'clip' } });
  });
});