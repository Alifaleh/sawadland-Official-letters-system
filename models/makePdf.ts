import pdf        = require('html-pdf');
import fs         = require('fs');
import path       = require('path');


export const makePdf = (letterNumber, date, subject, greeting, paragraph, footer, letterId) => {

  const regularFont = fs.readFileSync(path.join(__dirname,'../assets/fonts/Dubai-Regular.txt'));
  const boldFont    = fs.readFileSync(path.join(__dirname,'../assets/fonts/Dubai-Bold.txt'));
  const logo        = fs.readFileSync(path.join(__dirname,'../assets/images/logo.txt'));
  const outputPath  = path.join(__dirname,`../letters/letter_${Date.now().toString()}_${letterId}.pdf`);

  let html = fs.readFileSync('template.html', 'utf8');
  html = html.replace(/{{logo}}/g,logo.toString())
  html = html.replace(/{{regularFont}}/g,regularFont.toString())
  html = html.replace(/{{boldFont}}/g,boldFont.toString())
  html = html.replace(/{{letterNumber}}/g,letterNumber.toString())
  html = html.replace(/{{date}}/g,date.toString())
  html = html.replace(/{{subject}}/g,subject.toString())
  html = html.replace(/{{greeting}}/g,greeting.toString())
  html = html.replace(/{{paragraph}}/g,paragraph.toString())
  html = html.replace(/{{footer}}/g,footer.toString())

  type format = "A4";
  const format:format = "A4";
  let options = { format: format};
  
  pdf.create(html, options).toFile(outputPath, function(err, res) {
    if (err) return console.log(err);
  });
  while(!fs.existsSync(outputPath)){}
  setTimeout(()=>{
    fs.unlinkSync(outputPath)
  },60000)

  return outputPath
}
