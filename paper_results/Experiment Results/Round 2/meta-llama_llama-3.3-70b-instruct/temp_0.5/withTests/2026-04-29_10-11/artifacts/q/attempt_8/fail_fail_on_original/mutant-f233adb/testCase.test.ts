describe('Q', () => {
    it('should check ses condition', () => {
        const originalSes = globalThis.ses;
        globalThis.ses = { ok: () => true };
        const sesCheck = (function (definition) {
            if (typeof ses !== "undefined") {
                if (!ses.ok()) {
                    return;
                } else {
                    ses.makeQ = definition;
                }
            } else if (typeof window !== "undefined" || typeof self !== "undefined") {
                var global = typeof window !== "undefined" ? window : self;
                var previousQ = global.Q;
                global.Q = definition();
                global.Q.noConflict = function () {
                    global.Q = previousQ;
                    return this;
                };
            } else {
                throw new Error("This environment was not anticipated by Q. Please file a bug.");
            }
        });
        expect(sesCheck).toThrowError();
        globalThis.ses = originalSes;
    });
});