import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('Delta transform', () => {
  it('should use length not null as transformedData when otherData is null', () => {
    const a = new Delta([{ retain: 3 }]);
    const b = new Delta();
    b.ops = [{ retain: null as any, attributes: { bold: true } }];
    
    // Mock peekType to return 'retain' for ops with retain: null
    const originalPeekType = OpIterator.prototype.peekType;
    jest.spyOn(OpIterator.prototype, 'peekType').mockImplementation(function(this: OpIterator) {
      const op = (this as any).ops[(this as any).index];
      if (op && 'retain' in op && op.retain === null) return 'retain';
      return originalPeekType.call(this);
    });
    
    // Mock next to return {retain: null, ...} for ops with retain: null
    const originalNext = OpIterator.prototype.next;
    jest.spyOn(OpIterator.prototype, 'next').mockImplementation(function(this: OpIterator, length?: number) {
      const op = (this as any).ops[(this as any).index];
      if (op && 'retain' in op && op.retain === null) {
        (this as any).index += 1;
        (this as any).offset = 0;
        const retOp: any = { retain: null };
        if (op.attributes) retOp.attributes = op.attributes;
        return retOp;
      }
      return originalNext.call(this, length);
    });
    
    // Mock peekLength to return 1 for ops with retain: null
    const originalPeekLength = OpIterator.prototype.peekLength;
    jest.spyOn(OpIterator.prototype, 'peekLength').mockImplementation(function(this: OpIterator) {
      const op = (this as any).ops[(this as any).index];
      if (op && 'retain' in op && op.retain === null) return 1;
      return originalPeekLength.call(this);
    });
    
    const result = a.transform(b, false);
    
    jest.restoreAllMocks();
    
    // Original: otherData = null, typeof null === 'object' && null !== null = false
    //           transformedData = length = 1
    //           retain(1, {bold:true}) -> [{retain:1, attributes:{bold:true}}]
    // Mutated: otherData = null, typeof null === 'object' && true = true
    //          transformedData = null
    //          retain(null, {bold:true}) -> [{retain:null, attributes:{bold:true}}]
    expect(result.ops[0]?.retain).toBe(1);
  });
});