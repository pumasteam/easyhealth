import prisma from "../../../utils/prisma";

const updatePatient = async (req, res) => {
  const { id } = req.query;

  const resp = await prisma.patient.update({
    where: {
      id: id,
    },
    data: req.body,
  });

  res.status(200).json(resp);
};

export default updatePatient;
