import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q.join", () => {
    it("should join two promises and resolve with the first value if they are the same", () => {
        return Q(1).join(Q(1)).then((value) => {
            expect(value).toBe(1);
        });
    });

    it("should join two promises and reject with an error if they are not the same", () => {
        return Q(1).join(Q(2)).then(() => {
            expect(true).toBe(false);
        }, (error) => {
            expect(error.message).toBe("Q can't join: not the same: 1 2");
        });
    });

    it("should join two promises and resolve with the first value if they are the same, even if the second promise is resolved later", () => {
        var deferred1 = Q.defer();
        var deferred2 = Q.defer();

        var promise = Q(deferred1.promise).join(Q(deferred2.promise));

        deferred1.resolve(1);
        Q.delay(10).then(() => {
            deferred2.resolve(1);
        });

        return promise.then((value) => {
            expect(value).toBe(1);
        });
    });
});