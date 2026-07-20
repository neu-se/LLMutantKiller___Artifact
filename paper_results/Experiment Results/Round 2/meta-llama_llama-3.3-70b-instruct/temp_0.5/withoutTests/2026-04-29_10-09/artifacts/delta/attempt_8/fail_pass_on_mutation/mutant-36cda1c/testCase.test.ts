import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle newlines in the eachLine method', () => {
    const delta = new Delta();
    delta.insert('Hello\nWorld\n\n', null);
    let count = 0;
    let index = 0;
    delta.eachLine((line, _, idx) => {
      if (idx === 0) {
        expect(line.length()).toBe(5);
      } else if (idx === 1) {
        expect(line.length()).toBe(5);
      } else if (idx === 2) {
        expect(line.length()).toBe(0);
      } else {
        expect(line.length()).toBe(0);
      }
      index = idx;
      count++;
    });
    expect(count).toBe(3);
    expect(index).toBe(2);
  });
});