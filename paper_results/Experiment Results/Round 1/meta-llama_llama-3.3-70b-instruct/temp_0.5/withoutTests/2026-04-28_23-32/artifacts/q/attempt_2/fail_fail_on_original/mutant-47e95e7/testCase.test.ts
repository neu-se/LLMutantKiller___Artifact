import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q Promise', () => {
    it('should return a promise that is not pending when the value is an object', () => {
        const promise = Q({ a: 5 });
        let resolvedValue: any;
        promise.then((value) => {
            resolvedValue = value;
        });
        expect(resolvedValue).toEqual({ a: 5 });
    });
});