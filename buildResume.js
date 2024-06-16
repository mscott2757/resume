const util = require("util");
const exec = util.promisify(require("child_process").exec);
const path = require("path");
const fs = require("fs");

const transforms = {
  workExperience: (content) => {
    const experiences = content.workExperience.map(
      ({ name, startDate, endDate, location, title, items }) => {
        const lines = [
          `\\experiencetitle{${name}}{${startDate}--${endDate}}{${title}}{${location}}`,
          "\\begin{itemize}",
          ...items.map((item) => `\\item ${item}`),
          "\\end{itemize}",
        ];
        return lines;
      }
    );
    return experiences
      .reduce((acc, val) => {
        acc.push(...val);
        return acc;
      }, [])
      .join("\n");
  },
};

const main = async () => {
  let template = fs.readFileSync(path.join(__dirname, "template.tex"), {
    encoding: "utf8",
  });
  const content = JSON.parse(fs.readFileSync(path.join(__dirname, 'content.json')))

  for (const [key, genContent] of Object.entries(transforms)) {
    template = template.replace(`{{${key}}}`, genContent(content));
  }

  fs.writeFileSync(path.join(__dirname, "resume.tex"), template);
  await exec("xelatex resume.tex");
  await exec('rm resume.tex && open resume.pdf');
};

main();
