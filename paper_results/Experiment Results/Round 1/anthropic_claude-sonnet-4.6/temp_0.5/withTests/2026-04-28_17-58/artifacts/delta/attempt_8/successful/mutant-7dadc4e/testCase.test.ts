import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";
import OpIterator from "../../../../../../../../../../../subject_repositories/delta/src/OpIterator";

describe('transform()', () => {
  it('uses length not null as transformedData when otherData is null', () => {
    const origNext = OpIterator.prototype.next;
    let nc = 0;
    OpIterator.prototype.next = function(this: any, length?: number) {
      nc++;
      if (nc === 2) {
        return { retain: null as any };
      }
      return origNext.call(this, length);
    };
    
    const retainSpy = jest.spyOn(Delta.prototype, 'retain');
    
    const a = new Delta([{ retain: 1 }]);
    const b = new Delta([{ retain: 1 }]);
    a.transform(b, false);
    
    OpIterator.prototype.next = origNext;
    
    const retainArgs = retainSpy.mock.calls.map(call => call[0]);
    retainSpy.mockRestore();
    
    // Original: retain called with length (1), not null
    // Mutated: retain called with null (if patch works)
    expect(retainArgs).not.toContain(null);
  });
});