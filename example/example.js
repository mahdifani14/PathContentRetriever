var pathRetriever = require('../index');

pathRetriever.run('example/foo').then((result) => {
    console.log(JSON.stringify(result, null, 1));
})
