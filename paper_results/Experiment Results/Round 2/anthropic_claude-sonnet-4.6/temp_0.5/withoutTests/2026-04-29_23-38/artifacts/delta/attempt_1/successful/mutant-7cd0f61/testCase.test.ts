import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta.diff error message', () => {
  it('should throw "with non-document" when this delta contains non-insert ops', () => {
    const thisDelta = new Delta().insert('hello').delete(3);
    const otherDelta = new Delta().insert('world');

    expect(() => {
      thisDelta.diff(otherDelta);
    }).toThrow('diff() called with non-document');
  });
});