import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import { Op } from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Op.length with object retain in transform', () => {
  it('transform position accounts for object retain length', () => {
    const delta = new Delta().retain({ figure: true }).insert('A');
    // Object retain counts as length 1, so inserting 'A' after it
    // transforming position 1 (after the object retain) should give 2
    expect(delta.transform(1, false)).toEqual(2);
  });
});