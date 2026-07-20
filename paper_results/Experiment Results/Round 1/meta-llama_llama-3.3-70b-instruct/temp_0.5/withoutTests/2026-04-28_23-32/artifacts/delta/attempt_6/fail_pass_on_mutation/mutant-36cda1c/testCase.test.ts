import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle newline character in eachLine method', () => {
    const delta = new Delta();
    delta.insert('Hello\nWorld\n');
    let count = 0;
    let index = 0;
    delta.eachLine((line, attributes, idx) => {
      count++;
      index = idx;
    });
    expect(count).toBe(2);
    expect(index).toBe(1);
  });
});