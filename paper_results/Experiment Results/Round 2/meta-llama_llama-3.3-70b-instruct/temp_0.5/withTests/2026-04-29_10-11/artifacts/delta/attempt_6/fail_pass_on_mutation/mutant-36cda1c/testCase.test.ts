import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('eachLine() with newline at the end and index check', () => {
    const delta = new Delta().insert('Hello\nWorld!\n');
    let count = 0;
    let index = 0;
    delta.eachLine((line, attributes, idx) => {
      count += 1;
      index = idx;
      if (count === 2) {
        expect(idx).toEqual(1);
      }
    });
    expect(count).toEqual(2);
  });
});