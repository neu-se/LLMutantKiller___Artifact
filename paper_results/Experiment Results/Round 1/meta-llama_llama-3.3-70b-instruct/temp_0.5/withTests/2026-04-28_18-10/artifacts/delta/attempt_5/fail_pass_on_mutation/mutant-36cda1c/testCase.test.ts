import Delta from '../../../../../../../../../../../subject_repositories/delta/src/Delta.ts';

describe('Delta', () => {
  it('eachLine() with newline character and index calculation', () => {
    const delta = new Delta().insert('Hello\nWorld!');
    const spy = jest.fn();
    delta.eachLine(spy, '\n');
    expect(spy.mock.calls[0][2]).toBe(0);
    expect(spy.mock.calls[1][2]).toBe(1);
    const index = (delta.ops[0].insert as string).indexOf('\n');
    expect(index).toBe(5);
  });
});