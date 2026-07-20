import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('eachLine() mutation detection', () => {
  it('handles string op with no newline after embed correctly', () => {
    const lines: Delta[] = [];
    const lineAttrs: Record<string, unknown>[] = [];

    // A string op that has a newline, but the newline position calculation
    // is affected by having processed an embed just before
    const delta = new Delta()
      .insert('Hello\nWorld');

    delta.eachLine((line, attrs) => {
      lines.push(new Delta(line.ops.slice()));
      lineAttrs.push(attrs);
    });

    expect(lines.length).toBe(1);
    expect(lines[0].ops).toEqual([{ insert: 'Hello' }]);
  });
});