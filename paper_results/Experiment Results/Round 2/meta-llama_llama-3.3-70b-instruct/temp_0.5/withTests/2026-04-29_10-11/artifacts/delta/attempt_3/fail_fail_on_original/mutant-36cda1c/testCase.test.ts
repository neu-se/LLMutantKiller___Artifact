import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('eachLine() with newline at the end', () => {
    const delta = new Delta().insert('Hello\nWorld!\n');
    const lines: Delta[] = [];
    delta.eachLine((line, attributes, index) => {
      lines.push({ line, attributes, index });
    });
    expect(lines.length).toEqual(2);
    expect(lines[0].line.toString()).toEqual('Hello');
    expect(lines[1].line.toString()).toEqual('World!');
  });

  it('eachLine() with newline in the middle', () => {
    const delta = new Delta().insert('Hello\nWorld!');
    const lines: Delta[] = [];
    delta.eachLine((line, attributes, index) => {
      lines.push({ line, attributes, index });
    });
    expect(lines.length).toEqual(2);
    expect(lines[0].line.toString()).toEqual('Hello');
    expect(lines[1].line.toString()).toEqual('World!');
  });

  it('eachLine() without newlines', () => {
    const delta = new Delta().insert('HelloWorld!');
    const lines: Delta[] = [];
    delta.eachLine((line, attributes, index) => {
      lines.push({ line, attributes, index });
    });
    expect(lines.length).toEqual(1);
    expect(lines[0].line.toString()).toEqual('HelloWorld!');
  });
});