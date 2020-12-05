function get() {
  let task = {
    question: {
      status: true, // false => rasm // true => text
      field: "savol",
    },
    answers: [
      {
        status: true,
        field: "test",
      },
      {
        status: true,
        field: "test",
      },
      {
        status: true,
        field: "test",
      },
      {
        status: true,
        field: "test",
      },
    ],
    currect_answer: 1,
  };

  let statusAnswers = [1, 0, 1, 0];
  let aswers = [
    "1",
    "2",
    "3",
    "4"
  ];

  for (let i = 0; i < 4; i++) {
      if(statusAnswers[i] === 1){
       return answers_.text;
      }
  }

  const decodeBase64 = (file) => {
    return "file";
  };
}
