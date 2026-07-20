import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('eachLine() with newline at the end', () => {
    const delta = new Delta().insert('Hello\nWorld!\n');
    let count = 0;
    let index = 0;
    delta.eachLine((line, attributes, idx) => {
      count += 1;
      index = idx;
    });
    expect(count).toEqual(2);
    expect(index).toEqual(1);
  });

  it('eachLine() with newline in the middle', () => {
    const delta = new Delta().insert('Hello\nWorld!');
    let count = 0;
    let index = 0;
    delta.eachLine((line, attributes, idx) => {
      count += 1;
      index = idx;
    });
    expect(count).toEqual(2);
    expect(index).toEqual(1);
  });

  it('eachLine() without newlines', () => {
    const delta = new Delta().insert('HelloWorld!');
    let count = 0;
    let index = 0;
    delta.eachLine((line, attributes, idx) => {
      count += 1;
      index = idx;
    });
    expect(count).toEqual(1);
    expect(index).toEqual(0);
  });
});