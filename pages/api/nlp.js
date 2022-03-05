const nlp = async (req, res) => {
  const { body } = req;

  const resp = await fetch("https://api.infermedica.com/v3/parse", {
    method: "POST",
    headers: {
      "App-Id": process.env.INFERMEDICA_ID,
      "App-Key": process.env.INFERMEDICA_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: body.text,
      age: {
        value: body.age,
      },
    }),
  });

  const data = await resp.json();

  res.status(200).json(data);
};

export default nlp;
