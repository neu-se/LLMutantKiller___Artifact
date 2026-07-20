import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle newline character in eachLine method', () => {
    const delta = new Delta();
    delta.insert('Hello\nWorld');
    let count = 0;
    delta.eachLine(() => {
      count++;
    }, '\n');
    expect(count).toBe(2);
    const delta2 = new Delta();
    delta2.insert('Hello\nWorld\n');
    let count2 = 0;
    delta2.eachLine(() => {
      count2++;
    }, '\n');
    expect(count2).toBe(3);
  });
});