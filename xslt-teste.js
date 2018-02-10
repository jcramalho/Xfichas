var xslt4node = require('xslt4node')

var config = {
    xsltPath: __dirname + '/data/stylesheets/xfichas.xsl',
    sourcePath: __dirname + '/data/fichas-xml/ficha-HTML-FORMS-2013.xml',
    result: 'result.html',
    params: {
        discount: '2014/08/01'
    },
    props: {
        indent: 'yes'
    }
}

xslt4node.transform(config, function (err) {
    if (err) {
        console.log(err);
    }
})