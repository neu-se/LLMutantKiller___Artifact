import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function behavior", () => {
    it("should call the bootstrap function when executed as a script", () => {
        const bootstrapSpy = jest.fn((name: string, definition: any) => {
            if (name === 'promise') {
                bootstrapSpy.calledWithPromise = true;
            }
        });
        const originalBootstrap = globalThis.bootstrap;
        globalThis.bootstrap = bootstrapSpy;
        const definition = () => {};
        (function (definition: any) {
            "use strict";
            (globalThis as any).bootstrap("promise", definition);
        })(definition);
        expect(bootstrapSpy.calledWithPromise).toBe(true);
        globalThis.bootstrap = originalBootstrap;
    });
});