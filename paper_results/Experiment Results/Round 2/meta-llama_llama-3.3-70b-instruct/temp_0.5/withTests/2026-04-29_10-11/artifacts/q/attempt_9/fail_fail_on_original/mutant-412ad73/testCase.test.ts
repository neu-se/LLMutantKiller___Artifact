describe("Q function", () => {
    it("should not throw an error when bootstrap is called", () => {
        const originalBootstrap = (global as any).bootstrap;
        (global as any).bootstrap = function(definition: any) {
            expect(typeof definition).toBe('function');
        };
        expect(() => require('./q')).not.toThrowError();
        (global as any).bootstrap = originalBootstrap;
    });
});