describe('Q', () => {
    it('should create a global Q object when executed as a script in a browser-like environment', () => {
        // Set up a browser-like environment
        (global as any).window = {};
        (global as any).self = (global as any).window;

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
                return function Q() {};
            });
        `;
        eval(script);

        // Check if the Q object is created on the global object
        expect((global as any).window.Q).toBeDefined();
        expect(typeof (global as any).window.Q).toBe('function');
    });

    it('should not create a global Q object when executed as a script in a non-browser-like environment', () => {
        // Load the Q library with the mutation
        const script = `
            (function (definition) {
                "use strict";
                // This file will function properly as a <script> tag, or a module
                // using CommonJS and NodeJS or RequireJS module formats.  In
                // Common/Node/RequireJS, the module exports the Q API and when
                // executed as a simple <script>, it creates a Q global instead.
                if (false || typeof self !== "undefined") {
                    var global = typeof window !== "undefined" ? window : self;
                    var previousQ = global.Q;
                    global.Q = definition();
                    global.Q.noConflict = function () {
                        global.Q = previousQ;
                        return this;
                    };
                }
            })(function () {
                return function Q() {};
            });
        `;
        eval(script);

        // Check if the Q object is not created on the global object
        expect((global as any).Q).toBeUndefined();
    });
});