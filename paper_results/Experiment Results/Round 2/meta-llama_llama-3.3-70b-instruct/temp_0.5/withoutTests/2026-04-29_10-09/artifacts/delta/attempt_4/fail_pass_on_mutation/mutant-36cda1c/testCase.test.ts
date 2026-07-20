import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle newlines in the eachLine method', () => {
    const delta = new Delta();
    delta.insert('Hello\nWorld', null);
    let count = 0;
    delta.eachLine((line, attributes, index) => {
      if (index === 0) {
        expect(line.length()).toBe(5);
      } else {
        expect(line.length()).toBe(5);
      }
      count++;
    });
    expect(count).toBe(2);
  });
});