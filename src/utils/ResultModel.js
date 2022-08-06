class ResultModel {
  constructor(data) {
    this.data = data;
  }

  filteredAssessments(receiverId, senderId, month, year) {
    return this.data.filter((e) => new Date(e.period).getMonth() + 1 === month
    && new Date(e.period).getFullYear() === year
    && e.receiverId === receiverId
    && e.userId === senderId);
  }

  modelPerReceiver(users, months, years) {
    return users.map((receiver) => ({
      receiverId: receiver.userId,
      email: receiver.email,
      name: receiver.name,
      position: receiver.position,
      workDate: receiver.workDate,
      periods: years.map((year) => months.map((month) => ({
        period: `${month}-${year}`,
        senders: users.map((sender) => ({
          senderId: sender.userId,
          email: sender.email,
          name: sender.name,
          position: sender.position,
          workDate: sender.workDate,
          assessments: this.filteredAssessments(receiver.userId, sender.userId, month, year)
            .map((assessment) => ({
              assessmentId: assessment.assessmentId,
              criterionId: assessment.criterionId,
              criteriaName: assessment.criterion.name,
              description: assessment.criterion.description,
              position: assessment.criterion.position,
              point: assessment.point,
              createdAt: assessment.createdAt,
              updatedAt: assessment.updatedAt,
            })),
        })),
      }))),
    }));
  }

  modelPerSender(users, months, years) {
    return users.map((sender) => ({
      senderId: sender.userId,
      email: sender.email,
      name: sender.name,
      position: sender.position,
      workDate: sender.workDate,
      periods: years.map((year) => months.map((month) => ({
        period: `${month}-${year}`,
        senders: users.map((receiver) => ({
          receiverId: receiver.userId,
          email: receiver.email,
          name: receiver.name,
          position: receiver.position,
          workDate: receiver.workDate,
          assessments: this.filteredAssessments(receiver.userId, sender.userId, month, year)
            .map((assessment) => ({
              assessmentId: assessment.assessmentId,
              criterionId: assessment.criterionId,
              criteriaName: assessment.criterion.name,
              description: assessment.criterion.description,
              position: assessment.criterion.position,
              point: assessment.point,
              createdAt: assessment.createdAt,
              updatedAt: assessment.updatedAt,
            })),
        })),
      }))),
    }));
  }
}

module.exports = ResultModel;