import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Promise', () => {
    it('should throw an error when inspect is not provided', () => {
        const promise = Q.Promise({}, () => {}, undefined);
        expect(() => promise.inspect()).toThrowError();
    });
});