import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should not throw an error when inspect is undefined in the original code', () => {
        const promise = Q.Promise({}, (op: string, args: any[]) => {
            return {};
        }, undefined);
        expect(() => promise.inspect()).not.toThrowError();
    });
});