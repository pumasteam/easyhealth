import prisma from "../../../utils/prisma";

const createPatient = async (req, res) => {
  const resp = await prisma.patient.create({
    data: {
      name: "none",
    },
  });

  res.status(201).json(resp);
};

export default createPatient;
