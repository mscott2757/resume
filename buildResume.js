const exec = require("child_process").exec;
const path = require("path");
const fs = require("fs");

const transforms = {
  nameTitle: (data) => `\\name{${data}}`,
  workExperience: (data) => {
    const experiences = data.map(
      ({ name, startDate, endDate, location, title, items }) => {
        const lines = [
          `\\experiencetitle{${name}}{${startDate} -- ${endDate}}{${title}}{${location}}`,
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
  skills: (data) => {
    const lines = [
      '\\begin{tabular}{L{4.8cm} l}',
      data.map(({ name, items }) => `\\textbf{${name}} & ${items.join(', ')}\\\\`).join('\n\\\\[-1em]\n'),
      '\\end{tabular}',
    ]

    return lines.join('\n');
  }
};

const main = async () => {
  let template = fs.readFileSync(path.join(__dirname, "template.tex"), {
    encoding: "utf8",
  });
  const content = JSON.parse(
    fs.readFileSync(path.join(__dirname, "content.json"))
  );

  for (const [key, genContent] of Object.entries(transforms)) {
    template = template.replace(`{{${key}}}`, genContent(content[key]));
  }

  fs.writeFileSync(path.join(__dirname, "resume.tex"), template);
  exec(
    "xelatex resume.tex && open resume.pdf && rm resume.tex"
  ).stdout.pipe(process.stdout);
};

main();
