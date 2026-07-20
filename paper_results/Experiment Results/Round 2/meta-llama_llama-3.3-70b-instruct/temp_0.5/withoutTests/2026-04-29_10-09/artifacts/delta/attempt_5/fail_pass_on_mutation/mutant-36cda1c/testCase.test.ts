import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle newlines in the eachLine method', () => {
    const delta = new Delta();
    delta.insert('Hello\nWorld', null);
    let count = 0;
    let index = 0;
    delta.eachLine((line, attributes, idx) => {
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
  });
});