import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q.delay', function () {
    it('should delay fulfillment', function () {
        return Q.delay("what", 50).then(function (value) {
            expect(value).toBe("what");
        });
    });

    it('should not delay rejection', function () {
        var error = new Error("haha!");
        return Q.delay(error, 50).then(function () {
            expect(true).toBe(false);
        }, function (_error) {
            expect(_error).toBe(error);
        });
    });
});