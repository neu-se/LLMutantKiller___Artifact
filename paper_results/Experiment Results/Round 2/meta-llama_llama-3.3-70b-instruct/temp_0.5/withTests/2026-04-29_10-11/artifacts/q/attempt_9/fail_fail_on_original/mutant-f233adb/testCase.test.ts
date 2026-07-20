describe('Q', () => {
    it('should check ses condition', () => {
        const originalSes = (globalThis as any).ses;
        (globalThis as any).ses = { ok: () => true };
        const Q = (function (definition) {
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
        expect(Q).toBeDefined();
        (globalThis as any).ses = originalSes;
    });
});