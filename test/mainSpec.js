const { 
    expect
} = require('chai')
const sinon = require('sinon');
var fs = require('fs');
var pathRetriever = require('../index');
var fakeResult = {
    filenames: ['example/foo/f2.txt',
        'example/foo/f1.txt',
        'example/foo/bar/bar2.txt',
        'example/foo/bar/bar1.txt',
        'example/example.js'
    ],
    dirnames: ['example',
        'example/foo',
        'example/foo/bar',
        'example/foo/bar/baz'
    ]
};

describe("Path Retriever Fucntion Test On Linux", () => {

    context("When the input path is valid", () => {

        beforeEach(function() {
            this.originalPlatform = process.platform;
            Object.defineProperty(process, 'platform', {
                value: 'linux'
            })
            sandbox = sinon.sandbox.create()
            sandbox.stub(pathRetriever, "pathContentRetriever", (resolve, reject) => {
                return Promise.resolve(fakeResult);
            })
        })

        afterEach(function() {
            Object.defineProperty(process, 'platform', {
                value: this.originalPlatform
            })
            sandbox.restore();
        })

        it("should return an object with the path content info", () => {
            pathRetriever.run('example').then(
                (result) => {
                    expect(result).be.eq(fakeResult);
                })
        })
    })

    context("When the input path is not valid", () => {

        beforeEach(function() {
            this.originalPlatform = process.platform;
            Object.defineProperty(process, 'platform', {
                value: 'linux'
            })
        })

        afterEach(function() {
            Object.defineProperty(process, 'platform', {
                value: this.originalPlatform
            })
        })

        it("should return an error", () => {
            pathRetriever.run('mahdi').catch(
                (result) => {
                    expect(result).to.be.an('error')
                    expect(result.message).be.eq('The input path does not exist, Please try again with a valid path.')
                })
        })
    })
})

describe("Path Retriever Fucntion Test On Windows", () => {

    context("When the input path is valid", () => {

        beforeEach(function() {
            this.originalPlatform = process.platform;
            Object.defineProperty(process, 'platform', {
                value: 'win32'
            })
            sandbox = sinon.sandbox.create()
            sandbox.stub(pathRetriever, "pathContentRetriever", () => {
                return Promise.resolve(fakeResult);
            })
        })

        afterEach(function() {
            Object.defineProperty(process, 'platform', {
                value: this.originalPlatform
            })
            sandbox.restore();
        })

        it("should return an object with the path content info", () => {
            pathRetriever.run('example').then(
                (result) => {
                    expect(result).be.eq(fakeResult);
                })
        })
    })

    context("When the input path is not valid", () => {

        beforeEach(function() {
            this.originalPlatform = process.platform;
            Object.defineProperty(process, 'platform', {
                value: 'Windows'
            })
        })

        afterEach(function() {
            Object.defineProperty(process, 'platform', {
                value: this.originalPlatform
            })
        })

        it("should return an error", () => {
            pathRetriever.run('mahdi').catch(
                (result) => {
                    expect(result).to.be.an('error')
                    expect(result.message).be.eq('The input path does not exist, Please try again with a valid path.')
                })
        })
    })
})

describe("Path Retriever Fucntion Test On MAC OSX", () => {

    context("When the input path is valid", () => {

        beforeEach(function() {
            this.originalPlatform = process.platform;
            Object.defineProperty(process, 'platform', {
                value: 'darwin'
            })
            sandbox = sinon.sandbox.create()
            sandbox.stub(pathRetriever, "pathContentRetriever", () => {
                return Promise.resolve(fakeResult);
            })
        })

        afterEach(function() {
            Object.defineProperty(process, 'platform', {
                value: this.originalPlatform
            })
            sandbox.restore();
        })

        it("should return an object with the path content info", () => {
            pathRetriever.run('example').then(
                (result) => {
                    expect(result).be.eq(fakeResult);
                })
        })
    })

    context("When the input path is not valid", () => {

        beforeEach(function() {
            this.originalPlatform = process.platform;
            Object.defineProperty(process, 'platform', {
                value: 'darwin'
            })
        })

        afterEach(function() {
            Object.defineProperty(process, 'platform', {
                value: this.originalPlatform
            })
        })

        it("should return an error", () => {
            pathRetriever.run('mahdi').catch(
                (result) => {
                    expect(result).to.be.an('error')
                    expect(result.message).be.eq('The input path does not exist, Please try again with a valid path.')
                })
        })
    })
})
