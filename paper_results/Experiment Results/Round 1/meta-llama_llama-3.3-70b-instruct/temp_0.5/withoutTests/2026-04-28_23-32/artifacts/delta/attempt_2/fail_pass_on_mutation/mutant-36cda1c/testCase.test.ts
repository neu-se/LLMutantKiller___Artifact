import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle newline character in eachLine method', () => {
    const delta = new Delta();
    delta.insert('Hello\nWorld');
    let count = 0;
    let firstLine = '';
    let secondLine = '';
    delta.eachLine((line, attributes, index) => {
      if (index === 0) {
        firstLine = line.map((op) => op.insert).join('');
      } else if (index === 1) {
        secondLine = line.map((op) => op.insert).join('');
      }
      count++;
    });
    expect(count).toBe(2);
    expect(firstLine).toBe('Hello');
    expect(secondLine).toBe('World');
  });
});