const str = ''
const delimited = str.split(";").filter((v) => v !== "");

let final = [];

const questions = delimited.filter((v) => v.includes("Question"));

for (let i = 0; i < questions.length; i++) {
  const is_last = i === questions.length - 1;

  const start_index = delimited.findIndex((v) => v.includes(`Question ${i}`));
  const end_index = is_last
    ? delimited.length - 1
    : delimited.findIndex((v) => v.includes(`Question ${i + 1}`));

  const sliced = [...delimited].slice(start_index, end_index);

  const numbers = sliced.filter((v) => isFinite(v));

  const x_cords = [];
  const y_cords = [];

  for (let i = 1; i < numbers.length; i += 3) {
    x_cords.push(numbers[i]);
  }

  for (let i = 2; i < numbers.length; i += 3) {
    y_cords.push(numbers[i]);
  }

  const rows = x_cords.map((c, idx) => `${i},${c},${y_cords[idx]}`);
  final = [...final, ...rows];
}

const csv = "question,x_cords,y_cords" + "\n" + final.join("\n");

function pbcopy(data) {
  var proc = require("child_process").spawn("pbcopy");
  proc.stdin.write(data);
  proc.stdin.end();
}

pbcopy(csv);

