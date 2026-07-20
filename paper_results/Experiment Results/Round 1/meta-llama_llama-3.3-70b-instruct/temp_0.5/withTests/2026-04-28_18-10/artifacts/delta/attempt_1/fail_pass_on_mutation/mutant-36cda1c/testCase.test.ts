import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('eachLine() with newline character', () => {
    const delta = new Delta().insert('Hello\nWorld!');
    const spy = jest.fn();
    delta.eachLine(spy, '\n');
    expect(spy).toHaveBeenCalledTimes(2);
  });

  // it('eachLine() with custom newline character', () => {
  //   const delta = new Delta().insert('Hello\rWorld!');
  //   const spy = jest.fn();
  //   delta.eachLine(spy, '\r');
  //   expect(spy).toHaveBeenCalledTimes(2);
  // });
});