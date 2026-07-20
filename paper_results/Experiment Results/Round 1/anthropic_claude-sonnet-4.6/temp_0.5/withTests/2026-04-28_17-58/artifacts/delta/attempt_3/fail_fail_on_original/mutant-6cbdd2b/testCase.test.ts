import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('compose()', () => {
  it('throws when composing string insert with boolean retain value', () => {
    const a = new Delta().insert('A');
    // retain: true is not a number, so original skips optimization and hits the error in main loop
    // mutated enters optimization, copies 'A' into ops, advances otherIter, main loop never runs
    const b = new Delta([{ retain: true as any }]);
    expect(() => a.compose(b)).toThrow('cannot retain a string');
  });
});