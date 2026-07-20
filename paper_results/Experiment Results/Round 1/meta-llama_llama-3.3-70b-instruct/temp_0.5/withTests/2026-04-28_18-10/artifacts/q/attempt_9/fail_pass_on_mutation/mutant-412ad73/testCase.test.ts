import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function behavior", () => {
    it("should check if bootstrap is called with 'promise' when bootstrap is a function", () => {
        const bootstrapSpy = jest.fn();
        const originalBootstrap = globalThis.bootstrap;
        globalThis.bootstrap = bootstrapSpy;
        const definition = () => {};
        (function (definition: any) {
            "use strict";
            if (typeof globalThis.bootstrap === "function") {
                globalThis.bootstrap("promise", definition);
            }
        })(definition);
        expect(bootstrapSpy).toHaveBeenCalledTimes(1);
        expect(bootstrapSpy).toHaveBeenCalledWith("promise", definition);
        globalThis.bootstrap = originalBootstrap;
    });
});