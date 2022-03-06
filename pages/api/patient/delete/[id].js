import prisma from '../../../../utils/prisma';

const deletePatient = async (req, res) => {
  const { id } = req.query;

  const resp = await prisma.patient.delete({
    where: {
      id: id
    }
  });

  res.status(200).json(resp);
};

export default deletePatient;
