import prisma from '../../../utils/prisma';

const addConsulttion = async (req, res) => {
  const { id } = req.query;

  const patient = await prisma.consultation.create({
    data: { notes: req.body.notes, patientId: id }
  });

  res.status(201).json(patient);
};

export default addConsulttion;
