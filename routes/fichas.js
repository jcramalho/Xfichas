var express = require('express')
var router = express.Router()
var fs = require('fs')
var formidable = require('formidable')
var xslt4node = require('xslt4node')

/* GET fichas listing. */
router.get('/', function(req, res, next) {
    var repfichas = fs.readFileSync(__dirname + '/../data/rep-fichas.json', 'utf8')
    var mydata = JSON.parse(repfichas)
    res.render('listaFichas', {lista: mydata})
})

router.get('/ficha', function(req, res, next){
    res.render('novaFicha')
})

router.post('/ficha', function(req, res, next){
    var form = new formidable.IncomingForm()
    form.parse(req, function(err, fields, files){
        if(!err){
            var fenviada = files.ficha.path
            var fnova = "./data/fichas-xml/" + files.ficha.name

            fs.rename(fenviada, fnova, function(err){
                if(!err){
                    var fnome = files.ficha.name
                    var fhtml = fnome.substr(0, fnome.indexOf('.')) + '.html'
                    fields.ficha = fnome

                    // Transformação da ficha para HTML
                    var config = {
                        xsltPath: './data/stylesheets/xfichas.xsl',
                        sourcePath: './data/fichas-xml/' + fnome,
                        result: './public/fichas-html/' + fhtml,
                        params: {
                            numFicha: ''
                        },
                        props: {
                            indent: 'yes'
                        }
                    }
                    
                    xslt4node.transform(config, function (err) {
                        if (!err) {
                            fields.fres = fhtml
                            res.render('ficha-recebida', {info: fields})
                        }
                        else{
                            res.render('error', {error: err})
                        }
                    })
                }
                else{
                    res.render('error', {error: err})
                }
            })
        }
        else{
            res.render('error', {error: err})
        }
    })
})

module.exports = router;
