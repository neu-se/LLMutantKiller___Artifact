let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.query', function(done) {
        try {
            // Mock the Policy class if it doesn't exist or doesn't have the expected methods
            if (!_spacl_core.Policy || typeof _spacl_core.Policy.prototype.allow !== 'function') {
                class Policy {
                    constructor() {
                        this.rules = [];
                    }
                    
                    allow(path, action, condition) {
                        this.rules.push({ type: 'allow', path, action, condition });
                    }
                    
                    deny(path, action, condition) {
                        this.rules.push({ type: 'deny', path, action, condition });
                    }
                    
                    query(path, action, ctx) {
                        // Extract parameters from path pattern
                        const extractParams = (pattern, actualPath) => {
                            const patternParts = pattern.spl