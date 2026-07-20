describe("Q function", () => {
    it("should be defined and bootstrap should be called", () => {
        const bootstrapSpy = jest.fn();
        const originalBootstrap = (global as any).bootstrap;
        (global as any).bootstrap = bootstrapSpy;
        const q = require('../../../../../../subject_repositories/q/q.js');
        expect(bootstrapSpy).toHaveBeenCalledTimes(1);
        (global as any).bootstrap = originalBootstrap;
    });
});