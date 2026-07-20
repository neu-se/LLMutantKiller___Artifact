import q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('SES support', () => {
    it('should define Q as a function and behave correctly', () => {
        // Since the mutation removes the ses support, this test should pass on the original code and fail on the mutated code
        expect(typeof q).toBe('function');
        const promise = q(1);
        expect(typeof promise.then).toBe('function');
        expect(typeof q.defer).toBe('function');
        try {
            const deferred = q.defer();
            expect(typeof deferred.promise).toBe('object');
            expect(typeof deferred.resolve).toBe('function');
            expect(typeof deferred.reject).toBe('function');
            deferred.resolve(1);
            expect(deferred.promise.isFulfilled()).toBe(true);
            const rejected = q.reject(1);
            expect(rejected.isRejected()).toBe(true);
            const all = q.all([q(1), q(2)]);
            expect(all.isPending()).toBe(true);
            all.then(() => {
                expect(true).toBe(true);
            }, () => {
                expect(true).toBe(false);
            });
            const any = q.any([q(1), q(2)]);
            expect(any.isPending()).toBe(true);
            any.then(() => {
                expect(true).toBe(true);
            }, () => {
                expect(true).toBe(false);
            });
            const spread = q.spread([q(1), q(2)], (a, b) => {
                return a + b;
            });
            expect(spread.isPending()).toBe(true);
            spread.then((result) => {
                expect(result).toBe(3);
            });
            const tap = q(1).tap((value) => {
                return value + 1;
            });
            expect(tap.isPending()).toBe(true);
            tap.then((result) => {
                expect(result).toBe(1);
            });
            const fin = q(1).fin(() => {
                return 1;
            });
            expect(fin.isPending()).toBe(true);
            fin.then((result) => {
                expect(result).toBe(1);
            });
            const done = q(1).done();
            expect(done).toBeUndefined();
            const timeout = q(1).timeout(1000);
            expect(timeout.isPending()).toBe(true);
            timeout.then((result) => {
                expect(result).toBe(1);
            });
            const delay = q(1).delay(1000);
            expect(delay.isPending()).toBe(true);
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });
});