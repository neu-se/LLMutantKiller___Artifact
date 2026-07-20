describe("Q sparse array reduce fallback", () => {
  it("skips holes in sparse arrays during array_map", async () => {
    let QFresh: any;
    
    const nativeReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;
    
    jest.isolateModules(() => {
      QFresh = require("../../../../../../../../../../../subject_repositories/q/q.js");
    });
    
    Array.prototype.reduce = nativeReduce;
    
    const sparse: any[] = [QFresh(10), , QFresh(30)];
    const settled = await QFresh.allSettled(sparse);
    expect(settled).toHaveLength(2);
  });
});