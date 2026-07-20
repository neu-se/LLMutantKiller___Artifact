describe("captureLine function", () => {
    it("should return a line number", () => {
        const originalCaptureLine = (function (definition) {
            // This file will function properly as a <script> tag, or a module
            // using CommonJS and NodeJS or RequireJS module formats.  In
            // Common/Node/RequireJS, the module exports the Q API and when
            // executed as a simple <script>, it creates a Q global instead.

            // Montage Require
            if (typeof bootstrap === "function") {
                bootstrap("promise", definition);

            // CommonJS
            } else if (typeof exports === "object" && typeof module === "object") {
                module.exports = definition();

            // RequireJS
            } else if (typeof define === "function" && define.amd) {
                define(definition);

            // SES (Secure EcmaScript)
            } else if (typeof ses !== "undefined") {
                if (!ses.ok()) {
                    return;
                } else {
                    ses.makeQ = definition;
                }

            // <script>
            } else if (typeof window !== "undefined" || typeof self !== "undefined") {
                // Prefer window over self for add-on scripts. Use self for
                // non-windowed contexts.
                var global = typeof window !== "undefined" ? window : self;

                // Get the `window` object, save the previous Q global
                // and initialize Q as a global.
                var previousQ = global.Q;
                global.Q = definition();

                // Add a noConflict function so Q can be removed from the
                // global namespace.
                global.Q.noConflict = function () {
                    global.Q = previousQ;
                    return this;
                };

            } else {
                throw new Error("This environment was not anticipated by Q. Please file a bug.");
            }

        })(function () {
            "use strict";

            var hasStacks = false;
            try {
                throw new Error();
            } catch (e) {
                hasStacks = !!e.stack;
            }

            // All code after this point will be filtered from stack traces reported
            // by Q.
            var qStartingLine = captureLine();
            var qFileName;

            function captureLine() {
                if (!hasStacks) {}

                try {
                    throw new Error();
                } catch (e) {
                    var lines = e.stack.split("\n");
                    var firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
                    var fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
                    if (!fileNameAndLineNumber) {
                        throw new Error("fileNameAndLineNumber is null or undefined");
                    }

                    qFileName = fileNameAndLineNumber[0];
                    return fileNameAndLineNumber[1];
                }
            }

            function getFileNameAndLineNumber(stackLine) {
                // Named functions: "at functionName (filename:lineNumber:columnNumber)"
                // In IE10 function name can have spaces ("Anonymous function") O_o
                var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
                if (attempt1) {
                    return [attempt1[1], Number(attempt1[2])];
                }

                // Anonymous functions: "at filename:lineNumber:columnNumber"
                var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
                if (attempt2) {
                    return [attempt2[1], Number(attempt2[2])];
                }

                // Firefox style: "function@filename:lineNumber or @filename:lineNumber"
                var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
                if (attempt3) {
                    return [attempt3[1], Number(attempt3[2])];
                }
            }

            var qEndingLine = captureLine();

            return {
                captureLine: captureLine,
            };
        }).captureLine;

        expect(originalCaptureLine()).not.toBeNull();
    });
});