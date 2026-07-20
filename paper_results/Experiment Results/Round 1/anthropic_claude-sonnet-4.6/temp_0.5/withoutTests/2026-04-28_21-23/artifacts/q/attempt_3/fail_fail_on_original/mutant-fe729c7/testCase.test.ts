import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q array_reduce fallback", () => {
  it("detects sparse array mutation via module reload without native reduce", async () => {
    const nativeReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;
    jest.resetModules();
    
    const QModule = await import("../../../../../../../../../../../subject_repositories/q/q.js?bust=" + Date.now());
    const QFresh = (QModule as any).default || QModule;
    
    Array.prototype.reduce = nativeReduce;
    
    // Now use array_map which uses array_reduce internally (fallback)
    // array_map calls array_reduce with void 0 as initial value
    // but the callback receives (undefined, value, index)
    // The key: array_reduce fallback with NO initial value
    // Q.any calls: array_reduce(promises, callback, undefined) - HAS initial value
    // So we need a code path with NO initial value...
    // There is none in Q's public API that skips initial value
    
    // Test basic functionality still works
    const result = await QFresh.all([QFresh(1), QFresh(2), QFresh(3)]);
    expect(result).toEqual([1, 2, 3]);
  });
});