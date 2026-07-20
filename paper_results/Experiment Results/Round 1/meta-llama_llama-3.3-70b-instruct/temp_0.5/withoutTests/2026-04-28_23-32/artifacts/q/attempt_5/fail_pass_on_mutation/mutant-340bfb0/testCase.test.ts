import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not throw an error when trying to access a property with a valid key', () => {
        const error = new Error();
        const p = { stackCounter: 1 };
        Object.defineProperty(error, "__minimumStackCounter__", { value: p.stackCounter, configurable: true });
        expect(() => {
            const _ = error.__minimumStackCounter__;
        }).not.toThrowError();
    });
});