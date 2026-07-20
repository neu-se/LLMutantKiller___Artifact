import Delta, { OpIterator } from "../../../../../../../../../../../subject_repositories/delta/src/Delta.ts";

describe('Delta compose', () => {
  it('should not push delete when thisOp has null retain', () => {
    // Use jest.spyOn to force the iterator to return {retain: null}
    const nextSpy = jest.spyOn(OpIterator.prototype, 'next');
    
    nextSpy.mockImplementation(function(this: any, length?: number): any {
      const op = this.ops[this.index];
      if (op && op.retain === null) {
        this.index++;
        this.offset = 0;
        return { retain: null };
      }
      // Call original for other ops
      nextSpy.mockRestore();
      const result = OpIterator.prototype.next.call(this, length);
      // Re-spy
      jest.spyOn(OpIterator.prototype, 'next').mockImplementation(nextSpy.getMockImplementation()!);
      return result;
    });
    
    const a = new Delta([{ retain: null as any }]);
    const b = new Delta([{ delete: 1 }]);
    const result = a.compose(b);
    
    nextSpy.mockRestore();
    
    // Original: null !== null → false → delete NOT pushed → []
    // Mutated: true → delete IS pushed → [{delete:1}]
    expect(result.ops).toEqual([]);
  });
});