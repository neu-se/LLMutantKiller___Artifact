import { AttributeMap } from "../../../../../../../../../../../subject_repositories/delta/src/AttributeMap.ts";

describe('AttributeMap', () => {
  it('compose() with a non-object first argument', () => {
    const a = 'not an object';
    const b = { bold: true };
    expect(() => AttributeMap.compose(a, b)).toThrowError();
  });
});