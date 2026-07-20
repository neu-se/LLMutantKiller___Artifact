import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta';

describe('Delta', () => {
  it('eachLine() with newline at the end and index check', () => {
    const delta = new Delta().insert('Hello\nWorld!\n');
    let count = 0;
    delta.eachLine((line, _, idx) => {
      count += 1;
      if (idx === 0) {
        expect(line.ops[0].insert).toEqual('Hello');
      } else if (idx === 1) {
        expect(line.ops[0].insert).toEqual('World!');
      }
    });
    expect(count).toEqual(2);
  });
});