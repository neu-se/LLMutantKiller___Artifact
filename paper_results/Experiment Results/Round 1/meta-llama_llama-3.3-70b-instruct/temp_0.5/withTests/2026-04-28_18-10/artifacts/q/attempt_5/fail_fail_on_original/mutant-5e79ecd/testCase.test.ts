import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q done function', () => {
    it('should return undefined', () => {
        var promise = Q("foo");
        var result = promise.done(function () {});

        expect(result).toBeUndefined();
    });
});