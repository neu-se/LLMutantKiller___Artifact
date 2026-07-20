import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta transform', () => {
  it('correctly transforms numeric retains when this retain is shorter than other retain with attributes', () => {
    // this: retain(2), other: retain(5, {bold: true})
    // length = min(2, 5) = 2
    // Original: transformedData = (typeof 5 === 'object') ? 5 : 2 = 2 → retain(2, {bold:true})
    // Mutated:  transformedData = (true && 5 !== null) ? 5 : 2 = 5 → retain(5, {bold:true})
    // Then remaining: otherIter has retain(3, {bold:true}) left
    // Original result: retain(2, {bold:true}) + retain(3, {bold:true}) = retain(5, {bold:true})
    // Mutated result: retain(5, {bold:true}) + retain(3, {bold:true}) = retain(8, {bold:true})
    const thisDelta = new Delta().retain(2);
    const otherDelta = new Delta().retain(5, { bold: true });
    
    const result = thisDelta.transform(otherDelta, false);
    
    expect(result).toEqual(new Delta().retain(5, { bold: true }));
  });
});