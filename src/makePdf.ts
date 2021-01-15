import pdf        = require('html-pdf');
import fs         = require('fs');
import path       = require('path');


export const makePdf = (letterNumber, date, subject, greeting, paragraph, footer, letterId) => {

  const regularFont = fs.readFileSync(path.join(__dirname,'../assets/fonts/Dubai-Regular.txt'));
  const boldFont = fs.readFileSync(path.join(__dirname,'../assets/fonts/Dubai-Bold.txt'));
  const logo = fs.readFileSync(path.join(__dirname,'../assets/images/logo.txt'));
  var html = fs.readFileSync('template.html', 'utf8');
  html = html.replace("{{logo}}",logo.toString())
  html = html.replace("{{regularFont}}",regularFont.toString())
  html = html.replace("{{boldFont}}",boldFont.toString())
  html = html.replace("{{letterNumber}}",letterNumber.toString())
  html = html.replace("{{date}}",date.toString())
  html = html.replace("{{subject}}",subject.toString())
  html = html.replace("{{greeting}}",greeting.toString())
  html = html.replace("{{paragraph}}",paragraph.toString())
  html = html.replace("{{footer}}",footer.toString())

  type format = "A4";
  const format:format = "A4";
  var options = { format: format};

  fs.writeFileSync('../letters/lettertemp.html',html)
  
  pdf.create(html, options).toFile(`../letters/letter_${letterId}.pdf`, function(err, res) {
    if (err) return console.log(err);
  });

}
