import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should set a property on an object', () => {
        var obj: any = {};
        return Q(obj)
            .set("test", "value")
            .then(function () {
                expect(obj.test).toBe("value");
            });
    });
});