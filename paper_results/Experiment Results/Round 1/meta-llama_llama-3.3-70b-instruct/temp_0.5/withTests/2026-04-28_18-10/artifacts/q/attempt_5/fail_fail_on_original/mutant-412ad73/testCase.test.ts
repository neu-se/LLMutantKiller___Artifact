import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q function behavior", () => {
    it("should create a promise when given a value and bootstrap function is called", () => {
        const bootstrapSpy = jest.fn();
        const definition = () => {};
        (Q as any)(definition);
        expect(bootstrapSpy).not.toHaveBeenCalled();
        const bootstrap = (name: string, definition: any) => {
            bootstrapSpy();
        };
        (Q as any)(definition);
        expect(bootstrapSpy).toHaveBeenCalledTimes(1);
    });
});