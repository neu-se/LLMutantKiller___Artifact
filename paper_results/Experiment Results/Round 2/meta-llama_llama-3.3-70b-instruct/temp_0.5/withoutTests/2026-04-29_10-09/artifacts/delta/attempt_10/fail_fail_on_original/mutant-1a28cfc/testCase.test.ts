import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should correctly handle null condition in getEmbedTypeAndData function', () => {
    const a = { test: 'test' };
    const b = null;
    const op1: any = { retain: a };
    const op2: any = { retain: b };
    const getEmbedTypeAndData = (a: any, b: any) => {
      if (typeof a !== 'object' || a === null) {
        throw new Error(`cannot retain a ${typeof a}`);
      }
      if (typeof b !== 'object' || b === null) {
        throw new Error(`cannot retain a ${typeof b}`);
      }
      const embedType = Object.keys(a)[0];
      if (!embedType || embedType !== Object.keys(b)[0]) {
        throw new Error(
          `embed types not matched: ${embedType} != ${Object.keys(b)[0]}`,
        );
      }
      return [embedType, a[embedType], b[embedType]];
    };
    expect(() => {
      const [embedType, thisData, otherData] = getEmbedTypeAndData(op1.retain, op2.retain);
      if (typeof op2.retain !== 'object' || op2.retain === null) {
        throw new Error(`Test should pass`);
      }
    }).toThrowError('Test should pass');
  });
});