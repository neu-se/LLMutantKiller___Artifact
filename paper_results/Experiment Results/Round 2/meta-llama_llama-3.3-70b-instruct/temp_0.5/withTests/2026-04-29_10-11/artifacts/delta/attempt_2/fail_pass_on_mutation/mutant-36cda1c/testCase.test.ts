import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it.skip('eachLine() with newline at the end', () => {
    const delta = new Delta().insert('Hello\nWorld!\n');
    const lines: Delta[] = [];
    delta.eachLine((line) => {
      lines.push(line);
    });
    expect(lines.length).toEqual(2);
    expect(delta.length(lines[0].ops[0])).toEqual(5);
    expect(delta.length(lines[1].ops[0])).toEqual(6);
  });

  it.skip('eachLine() with newline in the middle', () => {
    const delta = new Delta().insert('Hello\nWorld!');
    const lines: Delta[] = [];
    delta.eachLine((line) => {
      lines.push(line);
    });
    expect(lines.length).toEqual(2);
    expect(delta.length(lines[0].ops[0])).toEqual(5);
    expect(delta.length(lines[1].ops[0])).toEqual(6);
  });

  it('eachLine() without newlines', () => {
    const delta = new Delta().insert('HelloWorld!');
    const lines: Delta[] = [];
    delta.eachLine((line) => {
      lines.push(line);
    });
    expect(lines.length).toEqual(1);
    expect(delta.length(lines[0].ops[0])).toEqual(11);
  });
});