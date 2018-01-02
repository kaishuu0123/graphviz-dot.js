var viz = require('./viz.js/viz-lite.js');
var concat = require('concat-stream');
var fs = require('fs');
var PDFDocument = require('pdfkit');
var SVGtoPDF = require('svg-to-pdfkit');

var yargs = require("yargs")
  .usage("Usage: $0 [options] <dotfile>")
  .command("dotfile", "DOT file", {alias: "dot"})
  .option("T", { alias: "type", describe: "Set output format (png or pdf)", type: "string"})
  .option("o", { alias: "output", describe: "output file path", type: "string"})
  .help("?")
  .alias("?", "help")
  .alias("h", "help");

function writeOutputFile(fileType, inputSVG, outputPath) {
  switch (fileType) {
    case 'pdf':
      var doc = new PDFDocument();
      stream = fs.createWriteStream();
      SVGtoPDF(doc, inputSVG, 0, 0)
      doc.pipe(stream);
      doc.end();
      break;
    case 'png':
      console.log("WARNING: png format is not supported yet.")
      break;
    case 'svg':
      // PASS THROUGH
    default:
      fs.writeFile(options.output, inputSVG);
  }
}

if (process.stdin.isTTY) {
  options = yargs
    .required(1, "DOT file is required")
    .argv;

  if (fs.existsSync(options._[0]) === false) {
    console.log('file not found: ' + options._[0]);
    process.exit(-1);
  }

  fs.readFile(options._[0], 'utf8', function(err, text) {
    outputSVG = viz(text);

    if (options.output) {
      writeOutputFile(options.type, outputSVG, options.output);
    } else {
      console.log(outputSVG);
    }
  });
} else {
  var stdin = "";

  options = yargs.argv;
  process.stdin.setEncoding('utf8');
  process.stdin.on('readable', function() {
      var chunk = this.read();
      if (chunk !== null) {
         stdin += chunk;
      }
  });
  process.stdin.on('end', function() {
    outputSVG = viz(stdin);

    if (options.output) {
      writeOutputFile(options.type, outputSVG, options.output);
    } else {
      console.log(outputSVG);
    }
  });
};
