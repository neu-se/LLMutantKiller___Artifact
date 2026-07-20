import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('transform()', () => {
  it('transform with null retain in other - check retain args via spy', () => {
    const retainArgs: any[] = [];
    const origRetain = Delta.prototype.retain;
    jest.spyOn(Delta.prototype, 'retain').mockImplementation(function(this: any, length: any, attrs?: any) {
      retainArgs.push(length);
      return origRetain.call(this, length, attrs);
    });
    
    const a = new Delta([{ retain: 1 }]);
    const b = new Delta([{ retain: null as any, attributes: { bold: true } }]);
    a.transform(b, false);
    
    jest.restoreAllMocks();
    
    // Original: retain called with length (1), not null
    // Mutated: retain called with null (if otherData = null)
    expect(retainArgs).not.toContain(null);
  });
});