import prisma from "../../../utils/prisma";

const createPatient = async (req, res) => {
  const resp = await prisma.patient.findMany();

  res.status(200).json(resp);
};

export default createPatient;
