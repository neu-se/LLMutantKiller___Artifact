describe("Q", () => {
    it.skip("should handle self being defined when window is undefined", () => {
        const originalWindow = globalThis.window;
        const originalSelf = globalThis.self;
        globalThis.window = undefined;
        globalThis.self = {};
        const q = globalThis.Q;
        expect(q).toBeDefined();
        globalThis.window = originalWindow;
        globalThis.self = originalSelf;
    });

    it("should throw an error when window and self are undefined in the mutated code", () => {
        const originalWindow = globalThis.window;
        const originalSelf = globalThis.self;
        globalThis.window = undefined;
        globalThis.self = undefined;
        const q = globalThis.Q;
        expect(() => {
            q();
        }).toThrow();
        globalThis.window = originalWindow;
        globalThis.self = originalSelf;
    });
});