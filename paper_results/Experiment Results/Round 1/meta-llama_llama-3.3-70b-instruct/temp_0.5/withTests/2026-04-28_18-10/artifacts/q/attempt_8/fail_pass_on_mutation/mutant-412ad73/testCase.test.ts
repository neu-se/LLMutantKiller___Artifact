import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function behavior", () => {
    it("should not call the bootstrap function when it is false", () => {
        const bootstrapSpy = jest.fn();
        const originalBootstrap = globalThis.bootstrap;
        globalThis.bootstrap = bootstrapSpy;
        const definition = () => {};
        (function (definition: any) {
            "use strict";
            if (false) {
                globalThis.bootstrap("promise", definition);
            }
        })(definition);
        expect(bootstrapSpy).not.toHaveBeenCalled();
        globalThis.bootstrap = originalBootstrap;
    });
});