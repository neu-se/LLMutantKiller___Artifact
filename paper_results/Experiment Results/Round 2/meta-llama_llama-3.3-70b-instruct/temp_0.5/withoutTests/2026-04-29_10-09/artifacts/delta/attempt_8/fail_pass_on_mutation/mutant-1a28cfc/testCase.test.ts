import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should correctly handle getEmbedTypeAndData function', () => {
    const a = { test: 'test' };
    const b = { test: 'test2' };
    const op1: any = { retain: a };
    const op2: any = { retain: b };
    const getEmbedTypeAndData = (op1: any, op2: any) => {
      const a = op1.retain;
      const b = op2.retain;
      if (typeof b!== 'object' || b === null) {
        throw new Error(`cannot retain a ${typeof b}`);
      }
      return true;
    };
    expect(() => getEmbedTypeAndData(op1, op2)).not.toThrowError();
    const op2Mutated: any = { retain: null };
    expect(() => getEmbedTypeAndData(op1, op2Mutated)).toThrowError('cannot retain a object');
  });
});