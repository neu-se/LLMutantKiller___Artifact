import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('handles retain:null in other op correctly', () => {
    // Create ops directly to bypass validation
    // thisOp will be { retain: 3 } (number)  
    // otherOp will be { retain: null, attributes: { bold: true } }
    // Op.length({ retain: null }) returns null (null as number)
    // Math.min(3, null) = 0 in JS (null coerces to 0)
    // So length = 0, which means next(0) is called
    // This will likely cause an infinite loop or return empty
    
    // Let me try retain: {} (empty object) instead
    // otherData = {} -> typeof {} === 'object' && {} !== null -> true -> transformedData = {}
    // Same in both versions... 
    
    // I think the key insight I'm missing: maybe the test should use
    // the embed handler path where transformedData gets overridden anyway,
    // but the initial value matters for the non-matching embed type case
    
    // For non-matching embed types, the handler.transform is NOT called
    // so transformedData stays as whatever was set initially
    // If thisData and otherData are objects but DIFFERENT embed types,
    // transformedData = otherData (both versions same since otherData is not null)
    
    // I'm stuck. Let me just test what I know works differently.
    // The only real difference: null retain in other
    
    const a = new Delta().retain(3);
    const b = new Delta([{ retain: null as any, attributes: { bold: true } }]);
    
    try {
      const result = a.transform(b, false);
      // If we get here, check the result
      // Original should give retain(0, {bold:true}) or similar based on Math.min(3, null)=0
      // Actually Math.min(3, null) = 0, so length=0
      // next(0) on thisIter... let's see what OpIterator.next(0) does
      // It returns a partial op of length 0, which for retain:3 would be retain:0
      // Then delta.retain(0, {bold:true}) - retain(0) returns this (no-op) since 0 <= 0
      // So result would be empty Delta
      // With mutated: transformedData = null, delta.retain(null, {bold:true})
      // retain(null) - null is not a number, so typeof null === 'number' is false
      // doesn't return early, creates {retain: null, attributes: {bold:true}}
      // So result would have {retain: null, attributes: {bold:true}}
      expect(result.ops.length).toBe(0); // original: empty (retain(0) is no-op)
    } catch(e) {
      // might throw or loop
      expect(true).toBe(false); // shouldn't throw
    }
  });
});