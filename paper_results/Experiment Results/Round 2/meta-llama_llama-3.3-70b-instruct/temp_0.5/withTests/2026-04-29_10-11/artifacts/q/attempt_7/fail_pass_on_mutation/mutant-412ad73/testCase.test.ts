describe("Q function", () => {
    it("should throw an error when bootstrap is not called", () => {
        const originalBootstrap = (global as any).bootstrap;
        (global as any).bootstrap = null;
        expect(() => require('./q')).toThrowError();
        (global as any).bootstrap = originalBootstrap;
    });
});