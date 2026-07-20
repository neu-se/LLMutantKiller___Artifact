import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when trying to define a property with an empty string as key', () => {
        const error = new Error();
        const p = { stackCounter: 1 };
        expect(() => {
            Object.defineProperty(error, "", { value: p.stackCounter, configurable: true });
        }).toThrowError();
    });
});