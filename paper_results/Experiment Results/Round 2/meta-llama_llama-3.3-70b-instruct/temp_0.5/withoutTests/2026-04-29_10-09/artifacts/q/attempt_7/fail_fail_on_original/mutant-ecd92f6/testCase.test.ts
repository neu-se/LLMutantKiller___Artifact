import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should throw an error when inspect is undefined in the mutated code', () => {
        const promise = Q.Promise({}, (op: string, args: any[]) => {
            return {};
        }, undefined);
        expect(() => promise.inspect()).toThrowError();
    });
});