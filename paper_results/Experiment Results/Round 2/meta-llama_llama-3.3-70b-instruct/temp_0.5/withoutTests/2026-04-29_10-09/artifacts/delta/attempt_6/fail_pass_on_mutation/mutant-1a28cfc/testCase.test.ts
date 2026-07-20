import Delta from "../../../../../../../../../../../subject_repositories/delta/src/Delta";

describe('Delta', () => {
  it('should correctly handle getEmbedTypeAndData function', () => {
    const a = { test: 'test' };
    const b = { test: 'test' };
    const getEmbedTypeAndData = (a: any, b: any) => {
      if (typeof a!== 'object' || a === null) {
        throw new Error(`cannot retain a ${typeof a}`);
      }
      if (typeof b!== 'object' || b === null) {
        throw new Error(`cannot retain a ${typeof b}`);
      }
      const embedType = Object.keys(a)[0];
      if (!embedType || embedType!== Object.keys(b)[0]) {
        throw new Error(
          `embed types not matched: ${embedType}!= ${Object.keys(b)[0]}`,
        );
      }
      return [embedType, a[embedType], b[embedType]];
    };
    expect(() => getEmbedTypeAndData(a, b)).not.toThrowError();
    const bMutated = { test2: 'test' };
    expect(() => getEmbedTypeAndData(a, bMutated)).toThrowError('embed types not matched: test!= test2');
    const bMutatedAgain = null;
    expect(() => getEmbedTypeAndData(a, bMutatedAgain)).toThrowError('cannot retain a object');
    const bMutatedOnceMore = 'test';
    expect(() => getEmbedTypeAndData(a, bMutatedOnceMore)).toThrowError('cannot retain a string');
    const bMutatedOneLastTime = { test: null };
    expect(() => getEmbedTypeAndData(a, bMutatedOneLastTime)).not.toThrowError();
  });
});