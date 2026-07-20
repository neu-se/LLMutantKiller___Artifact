describe('Q', () => {
    it('should create a global Q object when executed as a script', () => {
        // Load the Q library
        const script = `
            (function (definition) {
                "use strict";
                // This file will function properly as a <script> tag, or a module
                // using CommonJS and NodeJS or RequireJS module formats.  In
                // Common/Node/RequireJS, the module exports the Q API and when
                // executed as a simple <script>, it creates a Q global instead.
                if (typeof window !== "undefined" || typeof self !== "undefined") {
                    var global = typeof window !== "undefined" ? window : self;
                    var previousQ = global.Q;
                    global.Q = definition();
                    global.Q.noConflict = function () {
                        global.Q = previousQ;
                        return this;
                    };
                }
            })(function () {
                // Rest of the Q function remains the same
            });
        `;
        eval(script);

        // Check if the Q object is created on the global object
        expect((global as any).Q).toBeDefined();
        expect(typeof (global as any).Q).toBe('function');
    });
});