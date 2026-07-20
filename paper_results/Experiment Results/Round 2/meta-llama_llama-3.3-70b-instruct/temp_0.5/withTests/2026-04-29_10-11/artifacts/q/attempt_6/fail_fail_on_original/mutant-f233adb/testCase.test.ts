describe('Q', () => {
    it('should define Q', () => {
        const Q = (function (definition) {
            "use strict";

            if (typeof bootstrap === "function") {
                bootstrap("promise", definition);

            } else if (true && typeof module === "object") {

                module.exports = definition();

            } else if (typeof define === "function" && define.amd) {
                define(definition);

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

        })(function () {
            // ... original Q code here
        });
        expect(Q).toBeDefined();
    });
});