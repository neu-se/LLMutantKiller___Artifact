import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('eachLine() with newline at the end and index check', () => {
    const delta = new Delta().insert('Hello\nWorld!\n');
    let count = 0;
    delta.eachLine((line, attributes, idx) => {
      count += 1;
      if (idx === 0) {
        expect(line.toString()).toEqual('Hello');
      } else if (idx === 1) {
        expect(line.toString()).toEqual('World!');
      } else if (idx === 2) {
        expect(line.toString()).toEqual('');
      }
    });
    expect(count).toEqual(2);
  });
});