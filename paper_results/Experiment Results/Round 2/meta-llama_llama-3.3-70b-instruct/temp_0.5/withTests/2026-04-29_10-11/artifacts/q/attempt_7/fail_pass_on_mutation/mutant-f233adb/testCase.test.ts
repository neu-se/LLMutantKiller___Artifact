describe('Q', () => {
    it('should define Q', () => {
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
        expect(typeof sesCheck).toBe('function');
    });
});