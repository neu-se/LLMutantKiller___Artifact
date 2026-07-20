describe('Q', () => {
    it('should check ses condition', () => {
        const originalWindow = (globalThis as any).window;
        (globalThis as any).window = undefined;
        const originalSelf = (globalThis as any).self;
        (globalThis as any).self = undefined;
        const originalSes = (globalThis as any).ses;
        (globalThis as any).ses = undefined;
        expect(() => {
            (function (definition) {
                if ((globalThis as any).ses !== "undefined") {
                    if (!((globalThis as any).ses).ok()) {
                        return;
                    } else {
                        ((globalThis as any).ses).makeQ = definition;
                    }
                } else if (typeof window !== "undefined" || typeof self !== "undefined") {
                    var global = typeof window !== "undefined" ? window : self;
                    var previousQ = (global as any).Q;
                    (global as any).Q = definition();
                    (global as any).Q.noConflict = function () {
                        (global as any).Q = previousQ;
                        return this;
                    };
                } else {
                    throw new Error("This environment was not anticipated by Q. Please file a bug.");
                }
            })(function () {
                return {};
            });
        }).toThrowError("This environment was not anticipated by Q. Please file a bug.");
        (globalThis as any).window = originalWindow;
        (globalThis as any).self = originalSelf;
        (globalThis as any).ses = originalSes;
    });
});