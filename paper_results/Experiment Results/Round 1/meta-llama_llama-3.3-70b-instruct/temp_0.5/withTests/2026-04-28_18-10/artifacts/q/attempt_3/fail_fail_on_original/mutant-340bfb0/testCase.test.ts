import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should correctly handle object_defineProperty", () => {
        const error = new Error();
        const promise = Q.resolve();
        const p = { stackCounter: 1 };
        const stacks = [];
        stacks.unshift(p.stack);
        object_defineProperty(error, "__minimumStackCounter__", {value: p.stackCounter, configurable: true});
        expect(error.__minimumStackCounter__).toBe(1);
    });
});