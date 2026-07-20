import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('eachLine() with newline at the end', () => {
    const delta = new Delta().insert('Hello\nWorld!\n');
    let count = 0;
    delta.eachLine((line, attributes, index) => {
      count += 1;
    });
    expect(count).toEqual(2);
  });

  it('eachLine() with newline in the middle', () => {
    const delta = new Delta().insert('Hello\nWorld!');
    let count = 0;
    delta.eachLine((line, attributes, index) => {
      count += 1;
    });
    expect(count).toEqual(2);
  });

  it('eachLine() without newlines', () => {
    const delta = new Delta().insert('HelloWorld!');
    let count = 0;
    delta.eachLine((line, attributes, index) => {
      count += 1;
    });
    expect(count).toEqual(1);
  });
});