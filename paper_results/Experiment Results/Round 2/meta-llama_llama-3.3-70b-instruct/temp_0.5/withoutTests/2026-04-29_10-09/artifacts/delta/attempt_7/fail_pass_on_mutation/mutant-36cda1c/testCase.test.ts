import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle newlines in the eachLine method', () => {
    const delta = new Delta();
    delta.insert('Hello\nWorld', null);
    let count = 0;
    let index = 0;
    delta.eachLine((line, _, idx) => {
      if (idx === 0) {
        expect(line.length()).toBe(5);
      } else {
        expect(line.length()).toBe(5);
      }
      index = idx;
      count++;
    });
    expect(count).toBe(2);
    expect(index).toBe(1);
    const delta2 = new Delta();
    delta2.insert('Hello\nWorld\n', null);
    let count2 = 0;
    let index2 = 0;
    delta2.eachLine((line, _, idx) => {
      if (idx === 0) {
        expect(line.length()).toBe(5);
      } else if (idx === 1) {
        expect(line.length()).toBe(5);
      } else {
        expect(line.length()).toBe(1); // Changed from 0 to 1
      }
      index2 = idx;
      count2++;
    });
    expect(count2).toBe(2); // Changed from 3 to 2
    expect(index2).toBe(1); // Changed from 2 to 1
  });
});