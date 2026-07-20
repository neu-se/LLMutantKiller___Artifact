import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('retain() with attributes', () => {
  it('should not add attributes when attributes is null', () => {
    const delta = new Delta().retain(5, null);
    expect(delta.ops).toEqual([{ retain: 5 }]);
  });
});