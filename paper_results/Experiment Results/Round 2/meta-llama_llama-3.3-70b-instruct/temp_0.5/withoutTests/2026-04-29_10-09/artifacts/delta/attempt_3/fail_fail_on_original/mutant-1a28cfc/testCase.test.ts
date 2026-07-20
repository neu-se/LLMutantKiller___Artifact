import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should correctly handle getEmbedTypeAndData function', () => {
    const delta = new Delta();
    const a = { test: 'test' };
    const b = { test: 'test' };
    const op1: any = { retain: a };
    const op2: any = { retain: b };
    expect(() => {
      const [embedType, thisData, otherData] = Delta.getEmbedTypeAndData(op1.retain, op2.retain);
      if (typeof b !== 'object' || b === null) {
        throw new Error('Test should pass');
      }
    }).not.toThrowError();
  });
});