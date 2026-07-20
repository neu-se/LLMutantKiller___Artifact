import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle newline character in eachLine method', () => {
    const delta = new Delta();
    delta.insert('Hello\nWorld\n');
    let count = 0;
    let lines: string[] = [];
    delta.eachLine((line, attributes, index) => {
      let text = '';
      line.forEach((op) => {
        if (op.insert) {
          text += op.insert;
        }
      });
      lines.push(text);
      count++;
    }, '\n');
    expect(count).toBe(2);
    expect(lines.length).toBe(2);
    expect(lines[0]).toBe('Hello');
    expect(lines[1]).toBe('World');
  });
});