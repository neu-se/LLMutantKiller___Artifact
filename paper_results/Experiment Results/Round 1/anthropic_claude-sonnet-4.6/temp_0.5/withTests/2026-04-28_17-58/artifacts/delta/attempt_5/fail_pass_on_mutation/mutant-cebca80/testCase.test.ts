import Delta from "../../../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('invert() mutation detection', () => {
  it('correctly advances baseIndex when inverting multiple operations', () => {
    // This requires baseIndex to advance correctly between ops
    // retain(2) then delete(3) - the delete needs correct baseIndex to grab right chars
    const delta = new Delta().retain(2, { bold: true }).delete(3);
    const base = new Delta().insert('12345');

    // retain(2, {bold:true}) inverts to retain(2, {bold:null})
    // delete(3) starting at baseIndex=2 inverts to insert('345')
    const expected = new Delta().retain(2, { bold: null }).insert('345');

    const inverted = delta.invert(base);
    expect(inverted).toEqual(expected);
    expect(base.compose(delta).compose(inverted)).toEqual(base);
  });
});