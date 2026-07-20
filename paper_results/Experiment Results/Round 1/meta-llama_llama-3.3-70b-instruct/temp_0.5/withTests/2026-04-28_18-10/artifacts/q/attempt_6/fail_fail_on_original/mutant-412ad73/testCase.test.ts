import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function behavior", () => {
    it("should define Q as a function and call the bootstrap function", () => {
        const bootstrapSpy = jest.fn();
        const originalBootstrap = (Q as any).bootstrap;
        (Q as any).bootstrap = bootstrapSpy;
        const definition = () => {};
        const name = 'promise';
        (Q as any)(definition);
        expect(bootstrapSpy).toHaveBeenCalledTimes(1);
        expect(bootstrapSpy).toHaveBeenCalledWith(name, definition);
        (Q as any).bootstrap = originalBootstrap;
    });
});