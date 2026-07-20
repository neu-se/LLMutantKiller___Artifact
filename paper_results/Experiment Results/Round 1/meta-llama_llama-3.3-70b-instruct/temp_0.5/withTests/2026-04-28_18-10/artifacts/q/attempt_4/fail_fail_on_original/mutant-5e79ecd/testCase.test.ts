import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q done function', () => {
    it('should not return a promise', () => {
        var promise = Q("foo");
        var result = promise.done(function () {});

        expect(typeof result).not.toEqual('object');
        expect(typeof result).not.toEqual('function');
    });
});