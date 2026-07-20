import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should correctly define a property with a valid key', () => {
        const error = new Error();
        const p = { stackCounter: 1 };
        const key = "__minimumStackCounter__";
        Object.defineProperty(error, key, { value: p.stackCounter, configurable: true });
        expect(error[key]).toBe(1);
    });
});