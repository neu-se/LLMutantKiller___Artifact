import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function", function () {
    it("should throw an error when the condition is && and both window and self are undefined", function () {
        const windowMock = undefined;
        const selfMock = undefined;

        const globalObject = {
            window: windowMock,
            self: selfMock,
        };

        expect(() => {
            (function (global) {
                if (typeof global.window !== "undefined" && typeof global.self !== "undefined") {
                    var globalObject = typeof global.window !== "undefined" ? global.window : global.self;
                    var previousQ = globalObject.Q;
                    globalObject.Q = Q;
                    globalObject.Q.noConflict = function () {
                        globalObject.Q = previousQ;
                        return this;
                    };
                } else {
                    throw new Error("This environment was not anticipated by Q. Please file a bug.");
                }
            })(globalObject);
        }).toThrowError("This environment was not anticipated by Q. Please file a bug.");
    });

    it("should throw an error when the condition is && and both window and self are undefined in the mutated code", function () {
        const windowMock = undefined;
        const selfMock = undefined;

        const globalObject = {
            window: windowMock,
            self: selfMock,
        };

        expect(() => {
            (function (global) {
                if (typeof global.window !== "undefined" && typeof global.self !== "undefined") {
                    var globalObject = typeof global.window !== "undefined" ? global.window : global.self;
                    var previousQ = globalObject.Q;
                    globalObject.Q = Q;
                    globalObject.Q.noConflict = function () {
                        globalObject.Q = previousQ;
                        return this;
                    };
                } else {
                    throw new Error("This environment was not anticipated by Q. Please file a bug.");
                }
            })(globalObject);
        }).toThrowError("This environment was not anticipated by Q. Please file a bug.");
    });
});