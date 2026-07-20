import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('should correctly handle newline character in eachLine method', () => {
    const delta = new Delta();
    delta.insert('Hello\nWorld');
    let count = 0;
    delta.eachLine((line, attributes, index) => {
      if (index === 0) {
        expect(line.toString()).toBe('Hello');
      } else if (index === 1) {
        expect(line.toString()).toBe('World');
      }
      count++;
    });
    expect(count).toBe(2);
  });
});