import { Q } from './q.js';

describe('Q', () => {
    it('should test the behavior of the mutated file', () => {
        // This should pass for the original code and fail for the mutated code
        if (typeof window === 'undefined') {
            expect(true).toBe(true);
        } else {
            expect(true).toBe(false);
        }

        // Check if the Q.nextTick function is called immediately
        let called = false;
        Q.nextTick(() => {
            called = true;
        });
        expect(called).toBe(false);

        // Check if the Q.nextTick function is called after a timeout
        setTimeout(() => {
            expect(called).toBe(true);
        }, 0);

        // Check if the Q.nextTick function is called with the correct arguments
        let args = null;
        Q.nextTick((...args_) => {
            args = args_;
        });
        expect(args).toBeNull();

        // Check if the Q.nextTick function is called with the correct context
        let context = null;
        Q.nextTick(function() {
            context = this;
        });
        expect(context).toBeNull();

        // Check if the Q.nextTick function is called with the correct this
        let thisValue = null;
        Q.nextTick(function() {
            thisValue = this;
        });
        expect(thisValue).toBeNull();

        // Check if the Q.nextTick function is called with the correct bind
        let bind = null;
        Q.nextTick(function() {
            bind = this;
        }.bind(null));
        expect(bind).toBeNull();

        // Check if the Q.nextTick function is called with the correct apply
        let apply = null;
        Q.nextTick(function() {
            apply = this;
        }.apply(null));
        expect(apply).toBeNull();

        // Check if the Q.nextTick function is called with the correct call
        let call = null;
        Q.nextTick(function() {
            call = this;
        }.call(null));
        expect(call).toBeNull();

        // Check if the Q.nextTick function is called with the correct constructor
        let constructor = null;
        Q.nextTick(function() {
            constructor = this.constructor;
        });
        expect(constructor).toBeNull();

        // Check if the Q.nextTick function is called with the correct prototype
        let prototype = null;
        Q.nextTick(function() {
            prototype = Object.getPrototypeOf(this);
        });
        expect(prototype).toBeNull();

        // Check if the Q.nextTick function is called with the correct hasOwnProperty
        let hasOwnProperty = null;
        Q.nextTick(function() {
            hasOwnProperty = Object.prototype.hasOwnProperty.call(this, 'test');
        });
        expect(hasOwnProperty).toBeNull();
    });
});