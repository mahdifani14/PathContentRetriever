var fs = require('fs');
var output = {
    filenames: [],
    dirnames: []
};


/**
 * I have used the object style for implementing this NodeJs module
 * to have access to its private functions for mocking and test purposes.
 * And the output of this module is a synchronous promise, check the example.
 */
module.exports = {


    /**
     * pathContentRetriever - This fucntion does content retrieval of a path
     *
     * @param  {string} path   Valid path
     * @return {object}     An object contains the name of the files and directory of a path
     */
    pathContentRetriever: function(path) {

        var pathElements = fs.readdirSync(path);
        output.dirnames.push(path);

        return this.pathElementsIterator(path, pathElements)
            .then((res) => {
                return Promise.resolve(output);
            })
            .catch((error) => {
                throw error;
            })
    },


    /**
     * pathChecker - Validity checker of a path
     *
     * @param  {string} path description
     * @return {boolean}      true/false
     */
    pathChecker: function(path) {

        return fs.existsSync(path);
    },


    /**
     * pathElementsIterator - Check path elements to detect the files and sub directories, then save them
     *
     * @param  {string} path         Valid path
     * @param  {array} pathElements  Its element
     * @return {promise}             Always resolve because of checker validity function beforehand
     */
    pathElementsIterator: function(path, pathElements) {

        return new Promise((resolve) => {
            for (var i = 0; i < pathElements.length; i++) {
                var currentElement = `${path}/${pathElements[i]}`;

                if (this.typeChecker(currentElement) === 1) {
                    var subdir = currentElement;
                    output.dirnames.push(subdir);
                    var subdirElements = fs.readdirSync(subdir);
                    resolve(this.pathElementsIterator(subdir, subdirElements))
                }

                if (this.typeChecker(currentElement) === 2) {
                    var filename = currentElement;
                    output.filenames.push(filename);
                }
            }
            resolve();
        })
    },


    /**
     * typeChecker - Check the type of a path
     *
     * @param  {string} path
     * @return {integer}      According to the path type, it will return 1,2,0 if the path is a sub directory, file and unknown respectively
     */
    typeChecker: function(path) {

        if (fs.lstatSync(path).isDirectory()) return 1;
        else if (fs.lstatSync(path).isFile()) return 2;
        else return 0;
    },

    // Main function to call all the components
    run: function(path) {
        if (!this.pathChecker(path))
            throw new Error('The input path does not exist, Please try again with a valid path.');

        if (this.typeChecker(path) === 0)
            throw new Error('The input path is not valid, Please try again with a valid path.');

        if (this.typeChecker(path) === 2) {
            output.filenames.push(path);
            return output;
        }

        return this.pathContentRetriever(path)
            .then((result) => {
                console.log(JSON.stringify(result, null, 1));
                return result
            })
    }
}
