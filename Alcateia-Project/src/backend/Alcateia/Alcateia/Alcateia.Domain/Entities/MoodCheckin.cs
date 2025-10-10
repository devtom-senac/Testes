using Alcateia.Alcateia.Domain.Enums;

namespace Alcateia.Alcateia.Domain.Entities
{
    public class MoodCheckin
    {
        public Guid Id { get; private set; }
        public Guid UserId { get; private set; }
        public DateTime CheckinTime { get; private set; }
        public MoodStatus Status { get; private set; }
        public decimal CalculatedWeight { get; private set; }
        public User User { get; private set; }

        public MoodCheckin(Guid userId, MoodStatus status, decimal calculatedWeight)
        {
            if (userId == Guid.Empty)
            {
                throw new ArgumentException("O Check-in deve ser associado a um usuário válido.", nameof(userId));
            }

            this.Id = Guid.NewGuid();
            this.UserId = userId;
            this.Status = status;
            this.CalculatedWeight = calculatedWeight;
            this.CheckinTime = DateTime.UtcNow;
        }

        private MoodCheckin() { }
    }
}
